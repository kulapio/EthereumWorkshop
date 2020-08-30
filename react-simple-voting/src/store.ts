import { observable, action } from 'mobx'
import { getNetworkData } from './utils/network'
import Web3 from 'web3'

const CONTRACT_ADDRESS_KEY = 'voting_react_contractAddress'
class Store {
  @observable contractAddress: string | undefined | null = sessionStorage
    ? sessionStorage.getItem(CONTRACT_ADDRESS_KEY)
    : undefined
  @action
  updateContractAddress = (addr: string | undefined) => {
    this.contractAddress = addr
    if (addr) {
      sessionStorage.setItem(CONTRACT_ADDRESS_KEY, addr)
    } else {
      sessionStorage.removeItem(CONTRACT_ADDRESS_KEY)
    }
  }

  @observable netId: number | null = null
  @observable netName: string | null = null
  @observable netWarning: string | null = null
  @action
  updateNetId = (netId: number) => {
    this.netId = netId
    const networkData = getNetworkData(netId)
    console.log('Store -> updateNetId -> networkData', networkData)
    this.netName = networkData?.network
    this.netWarning = networkData?.warning
  }

  @observable web3: Web3 | null = null
  @action
  updateWeb3 = (w3: Web3) => {
    this.web3 = w3
  }
}

export const store = new Store()
