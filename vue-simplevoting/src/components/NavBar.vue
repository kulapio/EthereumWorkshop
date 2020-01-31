<template>
<div class="container">
  <div class="row">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="../assets/logo.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
            style="max-width: 100px;"
          >
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item href="#">
          Register Wallet
        </b-navbar-item>
        <b-navbar-item v-if="!web3.coinbase" @click="createAccount()">
          Create Wallet
        </b-navbar-item>
        <b-navbar-item href="#">
          Block Explorer
        </b-navbar-item>
        <b-navbar-dropdown label="Info">
          <b-navbar-item href="#">
            About
          </b-navbar-item>
          <b-navbar-item href="#">
            Contact
          </b-navbar-item>
        </b-navbar-dropdown>
      </template>

      <template slot="end">
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">
              Log in
            </a>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
  <div class="row">

    <b-taglist attached>
      <b-tag type="is-medium is-dark"> Network: {{ web3.networkId }} </b-tag>
      <b-tag type="is-medium is-info"> Account: {{ web3.coinbase }} </b-tag>
      <b-tag type="is-medium is-success"> Balance: {{ web3.balance }} ETH </b-tag>
    </b-taglist>


  </div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import SmartContract from '@/util'
import UserDataPersistance from '@/userData/persistance'

const smartContract = new SmartContract()

export default {
  name: 'NavBar',
  props: {
  },
  data: () => ({
    account: null,
    block: null,
    balance: null
  }),
  computed: {
    ...mapState({
      web3: state => state.web3
    })
  },
  async created () {
    // Load from local storage
    this.userData = new UserDataPersistance()

    this.network = await smartContract.getNetID()
    this.updateNetworkId(this.network.name)
    this.block = await smartContract.getBlock()

    try {
      this.account = await smartContract.loadUserAddress()
    } catch {
      this.account = ''
    }

    try {
      this.balance = await smartContract.getBalance(this.account)
    } catch {
      this.balance = '0'
    }

    console.log('Start: ', this.userData, this.account, this.balance, this.web3)

    if (this.account) {
      this.updateWeb3({
        'coinbase': this.account,
        'balance': this.balance,
        'networkId': this.network.name
      })

      let _this = this
      window.ethereum.on('accountsChanged', async function (accounts) {
        console.log("change", accounts[0])
        this.network = await smartContract.getNetID()
        try {
          this.balance = await smartContract.getBalance(accounts[0])
        } catch {
          this.balance = '0'
        }

        _this.updateWeb3({
          'coinbase': accounts[0],
          'balance': this.balance,
          'networkId': this.network.name
        })
      })

    } else {
      if (this.userData.userAddress) {
        let balance = await smartContract.getBalance(this.userData.userAddress)
        this.updateBalance({
          'address': this.userData.userAddress,
          'balance': balance
        })
        await this.updatePersistance(this.userData.userAddress, balance)
      } else {
        let account = await smartContract.createAccount()
        console.log ('Wallet: ', account)
        this.createWallet({
          'address': account.address,
          'balance': 0,
          'mnemonic': account.privateKey
        })
        await this.updatePersistance(account.address, 0, account.privateKey)
      }
    }

  },
  methods: {
    ...mapActions({
      updateWeb3: 'updateWeb3',
      createWallet: 'createWallet',
      updateNetworkId: 'updateNetworkId',
      updateBalance: 'updateBalance'
    }),
    async updatePersistance (userAddress, balance, mnemonic) {
      this.userData.update(userAddress, balance, mnemonic)
      this.userData.save()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
