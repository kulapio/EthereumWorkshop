import { useState, useEffect, useCallback } from 'react'
import { store } from '../store'

export const useAccounts = () => {
  const web3 = store.web3
  const [accounts, setAccounts] = useState<string[]>([])
  const [myAccount, setMyAccount] = useState<string>()
  const [balance, setBalance] = useState<string>()
  const fetch = useCallback(async () => {
    if (!web3) return
    const accs = await web3.eth.getAccounts()
    setAccounts(accs)
    const acc = accs[0]
    if (acc) {
      setMyAccount(acc)
      const result = await web3.eth.getBalance(acc)
      setBalance(web3.utils.fromWei(result))
    }
  }, [web3])
  useEffect(() => {
    fetch()
  }, [fetch])
  return {
    accounts,
    myAccount,
    balance,
  }
}
