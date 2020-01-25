const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer
// var EC = require('elliptic').ec;
const secp256k1 = require('secp256k1')

const infuraKey = ''
if ('' === infuraKey) {
  console.error('Please go to https://infura.io to get infuraKey (PROJECT ID)')
  return -1
}
const ChainInfo = {
  mainnet: {
    name: 'mainnet',
    chainIdForSig: 1
  },
  rinkeby: {
    name: 'rinkeby',
    chainIdForSig: 0
  },
  kovan: {
    name: 'kovan',
    chainIdForSig: 42
  }
}
const ChainConfig = ChainInfo.rinkeby
const web3 = new Web3(`https://${ChainConfig.name}.infura.io/v3/${infuraKey}`);

async function transferEther(account, toAddress, amount) {
  const txCount = await web3.eth.getTransactionCount(account.address)
  var rawTx = {
    from: account.address,
    nonce: util.bufferToHex(txCount),
    gasPrice: util.bufferToHex(2 * 10 ** 9),
    gasLimit: util.bufferToHex(151754),
    to: toAddress,
    value: util.bufferToHex(amount),
    data: '0x'
  }
  console.log('rawTx', rawTx)

  let tx = new Tx(rawTx, { chain: ChainConfig.name })
  // console.log('tx.getChainId()', tx.getChainId())
  // let tx = new Tx(rawTx)
  console.log('transaction: ', tx.serialize().toString('hex'))
  console.log('tx.hash(false): ', tx.hash(false).toString('hex'))

  // var ec = new EC('secp256k1');
  // var key = ec.keyFromPrivate(account.privateKey);
  // var signature = key.sign(tx.hash(false).toString('hex'))

  // tx.r = Buffer.from(signature.r.toString('hex'), 'hex')
  // tx.s = Buffer.from(signature.s.toString('hex'), 'hex')
  // const v = chainId ? signature.recoveryParam + (chainId * 2 + 35) : signature.recoveryParam + 27

  var sig = secp256k1.ecdsaSign(tx.hash(false), Buffer.from(account.privateKey, 'hex'))
  tx.r = Buffer.from(sig.signature.slice(0, 32), 'hex')
  tx.s = Buffer.from(sig.signature.slice(32, 64), 'hex')
  const v = ChainConfig.chainIdForSig ? sig.recid + (ChainConfig.chainIdForSig * 2 + 35) : sig.recid + 27
  tx.v = Buffer.from(v.toString(16), 'hex')
  console.log('tx.v', tx.v)
  let serializedTx = tx.serialize()
  console.log('transaction signed: ', serializedTx.toString('hex'))

  const result = await web3.eth.sendSignedTransaction('0x' + 
    serializedTx.toString('hex'))
  console.log(`result`, result)
  return true
}

async function voteCandidate(account, name) {
  const abi = [
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "voteForCandidate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "candidateNames",
          "type": "string[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "VoteReceived",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "candidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidateList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "totalVotesFor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]
  const contractAddress = '0xd991dD045b00866f0f6cAd33e9B1341272a792d7'
  const txCount = await web3.eth.getTransactionCount(account.address)
  const contract = new web3.eth.Contract(
    abi, 
    contractAddress,
    {from: account.address})

  var rawTx = {
    from: '0x55509eC248c859e15293189548a8b79E2306e0CD',
    nonce: '0x' + txCount.toString(16),
    gasPrice: '0x003B9ACA00',
    // gasPrice: util.bufferToHex(9 * 10 ** 9),
    // gasLimit: util.bufferToHex(100000),
    gasLimit: '0x250CA',
    to: contractAddress,
    value: '0x0',
    data: contract.methods.voteForCandidate(name).encodeABI()
  }

  let tx = new Tx(rawTx, { chain: 'rinkeby' })
  tx.sign(new Buffer.from(account.privateKey, 'hex'))

  let serializedTx = tx.serialize()

  const result = await web3.eth.sendSignedTransaction('0x' + 
    serializedTx.toString('hex'))
  console.log(`result`, result)
  // .on('receipt', console.log);
  return true
}

async function main() {

  const currentBlockNum = await web3.eth.getBlockNumber()
  console.log(`currentBlockNum ${currentBlockNum}`)

  // Generate account
  const result = await web3.eth.accounts.create()
  console.log(`account: ${JSON.stringify(result)}`)
  const account = {
    "address":"0x55509eC248c859e15293189548a8b79E2306e0CD",
    "privateKey":"4f361e3b2c678f9f8418d530b116fb7d28d143a86f7cdd8dfd8c80aeaf936b0a"
  }

  // Get balance
  const balance = await web3.eth.getBalance(account.address)
  console.log(`balance ${balance}`)

  // transfer
  await transferEther(account, '0x786F95663B1fEAa429FE608dd51946356f9e6D54', 12)

  // Vote
  // voteCandidate(account, 'dog')

  return true
}


(async () => {
  const result = await main()
  console.log('result', result)
})()
