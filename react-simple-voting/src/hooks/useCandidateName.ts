import { useState, useCallback, useEffect } from 'react'
import { useContract } from './useContract'

export const useCandidateName = (index: number) => {
  const [name, setName] = useState<string>()
  const contract = useContract()
  const fetch = useCallback(async () => {
    if (!contract) return
    const n = await contract.methods.candidateList(index).call()
    setName(n)
  }, [contract, index])
  useEffect(() => {
    fetch()
  }, [fetch])
  return {
    name,
    fetch,
  }
}
