import { useEffect, useCallback } from 'react'
import { store } from '../store'

export const useNetId = () => {
  const web3 = store.web3
  const triggerNetId = useCallback(async () => {
    if (web3) {
      const netId = await web3.eth.net.getId()
      console.log('triggerNetId -> netId', netId)
      store.updateNetId(netId)
    }
  }, [web3])
  useEffect(() => {
    triggerNetId()
  }, [triggerNetId])
}
