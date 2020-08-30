import { observable, action } from 'mobx'

const CONTRACT_ADDRESS_KEY = 'voting_react_contractAddress'
class Store {
  @observable contractAddress: string | undefined | null = sessionStorage
    ? sessionStorage.getItem(CONTRACT_ADDRESS_KEY)
    : undefined
  @action
  updateContractAddress = (addr: string) => {
    this.contractAddress = addr
    sessionStorage.setItem(CONTRACT_ADDRESS_KEY, addr)
  }
}

export const store = new Store()
