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
      <b-tag type="is-medium is-success"> balance: {{ web3.balance }} </b-tag>
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
    wallet: []
  },
  data: () => ({
    accountExist: false,
    account: web3.coinbase
  }),
  computed: {
    ...mapState({
      web3: state => state.web3
    })
  },
  created() {
  },
  methods: {
    ...mapActions({
      updateWeb3: 'updateWeb3'
    }),
    async createAccount() {
      this.account = await smartContract.createAccount()
      console.log(this.account);
    }
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
