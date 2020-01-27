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
      error: null
    },
    contractInstance: null
  },
  actions: {
    updateWeb3 ({commit}, payload) {
      console.log('updateWeb3 Action being executed')
      commit('updateWeb3Instance', payload)
    }
  },
  mutations: {
    updateWeb3Instance (state, payload) {
      console.log('updateWeb3instance Mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.networkId = payload.networkId
      state.web3.balance = payload.balance
      state.web3.web3Instance = payload.web3
    }
  }
})

