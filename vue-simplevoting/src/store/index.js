import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state: {
    web3: {
      web3Instance: null,
      networkId: null,
      coinbase: null,
      balance: null,
      error: null,
      mnemonic: null
    },
    contractInstance: null
  },
  actions: {
    updateWeb3 ({commit}, payload) {
      console.log('updateWeb3 Action being executed')
      commit('updateWeb3Instance', payload)
    },
    createWallet ({ commit }, wallet) {
      commit('CREATE_WALLET', wallet)
    },
    updateBalance ({ commit }, balance) {
      commit('UPDATE_BALANCE', balance)
    },
    updateNetworkId ({ commit }, NetworkId) {
      commit('updateNetworkId', NetworkId)
    }
  },
  mutations: {
    updateNetworkId (state, networkId) {
      state.web3.networkId = networkId
    },
    updateWeb3Instance (state, payload) {
      console.log('updateWeb3instance Mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.networkId = payload.networkId
      state.web3.balance = payload.balance
    },
    CREATE_WALLET (state, wallet) {
      state.web3.coinbase = wallet.address
      state.web3.balance = wallet.balance
      state.web3.mnemonic = wallet.mnemonic
    },
    UPDATE_BALANCE (state, wallet) {
      state.web3.coinbase = wallet.address
      state.web3.balance = wallet.balance
    }
  }
})

