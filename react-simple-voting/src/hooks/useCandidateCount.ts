import { useState, useCallback, useEffect } from 'react'
import { useContract } from './useContract'

export const useCandidateCount = () => {
  const [count, setCount] = useState<number>(0)
  const contract = useContract()
  const fetch = useCallback(async () => {
    if (!contract) return
    const c = await contract.methods.candidateCount().call()
    setCount(parseInt(c as string))
  }, [contract])
  useEffect(() => {
    fetch()
  }, [fetch])
  return {
    count,
    fetch,
  }
}
