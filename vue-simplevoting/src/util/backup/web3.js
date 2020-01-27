export default class Web3Service {
  constructor (options) {
    this.Web3 = options.Web3
  }

  initialWeb3 () {
    // if (typeof window.web3 !== 'undefined') {
    //   return new this.Web3(window.web3.currentProvider)
    // } else {
    //   const httpProvider = new this.Web3.providers.HttpProvider('https://mainnet.infura.io/xxxxxx')
    //   return new this.Web3(httpProvider)
    // }

    // Modern dapp browsers...
    if (window.ethereum) {
      return new this.Web3(window.ethereum)
    }
    // Legacy dapp browsers, checking if Web3 has been injected by the browser (Mist/MetaMask)
    else if (typeof window.web3 !== 'undefined') {
      // Use Mist/MetaMask's provider
      return new this.Web3(window.web3.currentProvider);

    } else {
      console.log('No web3? You should consider trying MetaMask!')
      const httpProvider = new this.Web3.providers.HttpProvider('https://mainnet.infura.io/xxxxx')
      // web3 = new Web3( new Web3.providers.HttpProvider( "https://rpc.tch.in.th" ));
      return new this.Web3(httpProvider)
    }
  }
}
