const validateConnection = {
  async validateWeb3Connection (toast) {
    // Check Web3 wallet connection
    if (typeof window.web3 === 'undefined') {
      const errorText = 'Please install MetaMask, Cipher or Trust wallet.'
      this.showToastError(toast, errorText, 60000)
      throw Error(errorText)
    }

    // Check Network
    let currentNetwork = await this.getNetworkName()
    console.log(`currentNetwork ${this.network}`)
    if (currentNetwork !== this.network) {
      const errorText = `Wrong network! Please switch to **${this.capitalize(this.network)}** on Metamask.`
      this.showToastError(toast, errorText, 60000)
      throw Error(errorText)
    }
  },

  async validateWallet (toast) {
    let accounts = await this.web3.eth.getAccounts()
    console.log(`accounts ${accounts}`)
    if (accounts.length === 0) {
      // Loop check if user unlocked then refresh
      setInterval(async () => {
        let accounts = await this.web3.eth.getAccounts()
        if (accounts.length > 0) {
          console.log('refresh')
          location.reload()
        }
      }, 100)

      const errorText = 'Please unlock your MetaMask.'
      this.showToastError(toast, errorText, 60000)
      throw Error(errorText)
    }
  },

  // async showToastSuccess (toast, text) {
  //   toast.open({
  //     message: text,
  //     type: 'is-success'
  //   })
  // }

  async showToastError (toast, text, duration = 5000) {
    toast.open({
      duration: duration,
      message: text,
      // position: 'is-bottom',
      type: 'is-danger'
    })
  },

  capitalize (text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }
}

export default validateConnection
