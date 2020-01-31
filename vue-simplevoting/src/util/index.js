import Web3 from 'web3'
import ContractAbi from '../abi/voting.json'
import validateConnection from './validateConnection'

class SmartContract {
  constructor (
    // ethNode = 'wss://rinkeby.infura.io/_ws',
    contractAddr = '0x08C0EbDa8D78c64715A0772f9697942E2Bc0B471') {

    // Modern dapp browsers...
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);

      try {
        // Request account access if needed
        window.ethereum.enable().then(() => {
        })
      }
      catch(err) {
        console.log(err);
      }
    }
    // Legacy dapp browsers, checking if Web3 has been injected by the browser (Mist/MetaMask)
    else if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      this.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('No web3? You should consider trying MetaMask!')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      // web3 = new Web3( new Web3.providers.HttpProvider( "https://kovan.infura.io/" ));
      this.web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/1bfd0db83ef340ef8c81945c5e96a911"));
    }

    console.log('web3: ', this.web3);
    this.contractAddr = contractAddr

    this.loadUserAddress().then(account => {
      this.account = account
    })

    this.contract = new this.web3.eth.Contract(ContractAbi, this.contractAddr)

    console.log('Methods: ', this.contract.methods)

  }

  async getNetID() {

    let netId = await this.web3.eth.net.getId()
    let network = '';
    let warning = '';
    // web3.version.getNetwork((err, netId) => {
    console.log('netId: ' + netId)
    switch (netId) {
      case 1:
          network = 'Mainnet';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 2:
          network = 'Deprecated Morden';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 3:
          network = 'Ropsten';
          warning = 'please switch your network to Kovan or Thai Chain';
        break
      case 4:
          network = 'Rinkeby';
        break
      case 7:
          network = 'Thai Chain';
          // contractAddr = '0x0898424ddf8f9478aad9f2280a6480f1858ad1c6';
        break
      case 42:
          network = 'Kovan';
        break
      default:
          network = 'Unknown';
          warning = 'please switch your network to Kovan or Thai Chain';
    }

    console.log('result: ',netId, network, warning);
    return {
      'netId': netId,
      'name': network,
      'warning': warning
    }
}
  async loadUserAddress () {
    let accounts = await this.web3.eth.getAccounts()
    console.log('loadUserAddress >> ' + accounts[0])

    return accounts[0]
  }

  async getBlock() {
    return this.web3.eth.getBlock(48, function(error, result){
        if(!error) {
          // console.log(JSON.stringify(result));
          return result
        } else {
          // console.error(error);
          return error
        }
    })
  }

  // Get account balance
  async getBalance(account) {
    let balance = await this.web3.eth.getBalance(account)
    console.log('Balance: ', balance)

    return await this.web3.utils.fromWei(balance)

  }

  async createAccount() {
    return await this.web3.eth.accounts.create()
  }

  async getCandidateCount() {
    return await this.contract.methods.candidateCount().call()
  }

  async getCandidateName(index) {
    return await this.contract.methods.candidateList(index).call()
  }

  async getCandidateTotalVote(name) {
    return await this.contract.methods.totalVotesFor(name).call()
  }

  async voteAt(name, network, userAccount) {

    console.log(name, network, userAccount);
    // let name = await this.contract.methods.candidateList(index).call()
    let options = {
      from: userAccount
    }

    // Send a transaction to blockchain
    return await this.contract.methods.voteForCandidate(name).send(options)
      .on('error', (error) => {
        console.error(error)
        return {
          "result": "error",
          "message": error
        }
      })

      // Transaction already saved to mempool
      .on('transactionHash', (transactionHash) => {
        // Show tx hash
        console.log(transactionHash)

        let link
        if ('Thai Chain' == network) {
          link = "https://exp.tch.in.th/tx/" + transactionHash
        } else {
          link = "https://" + network.toLowerCase() + ".etherscan.io/tx/" + transactionHash
        }
        return {
          "result": "txhash",
          "message": link
        }
      })

      // Transaction got confirmed
      .on('confirmation', (confirmationNumber, receipt) => {
          console.log('confirmationNumber', confirmationNumber)
          console.log(receipt);
          return {
            "result": "confirmation",
            "message": "OK",
            "confirmationNumber": confirmationNumber,
            "receipt": receipt
          }
      })
    }


}

Object.setPrototypeOf(SmartContract.prototype, {...validateConnection})

export default SmartContract