import { useContract } from './useContract'
import { useCallback, useState } from 'react'
import { useAccounts } from './useAccounts'
import { message } from 'antd'

export const useVote = () => {
  const contract = useContract()
  const { myAccount } = useAccounts()
  const [loading, setLoading] = useState(false)

  const vote = useCallback(
    async (name: string, callback: any) => {
      if (!contract || !myAccount) return
      let options = {
        from: myAccount,
      }
      setLoading(true)
      let confirmed = false
      let errored = false
      // Send a transaction to blockchain
      contract.methods
        .voteForCandidate(name)
        .send(options)
        .on('error', (error: any) => {
          setLoading(false)
          if (!errored) {
            console.error(error)
            message.error('Vote failed')
            errored = true
          }
        })
        .on('confirmation', (confirmationNumber: any, receipt: any) => {
          console.log('confirmationNumber', confirmationNumber)
          console.log(receipt)
          setLoading(false)
          if (!confirmed) {
            message.success('Vote confirmed')
            if (callback) {
              callback()
            }
            confirmed = true
          }
        })
    },
    [contract, myAccount],
  )

  return {
    vote,
    loading,
  }
}
