import { useState, useCallback, useEffect } from 'react'
import { useContract } from './useContract'

export const useCandidateScore = (name?: string) => {
  const [score, setScore] = useState<number>(0)
  const contract = useContract()
  const fetch = useCallback(async () => {
    if (!contract) return
    try {
      const sc = await contract.methods.totalVotesFor(name).call()
      if (sc) setScore(parseInt(sc))
    } catch (err) {
      console.warn(err)
    }
  }, [contract, name])
  useEffect(() => {
    fetch()
  }, [fetch])
  return {
    score,
    fetch,
  }
}
