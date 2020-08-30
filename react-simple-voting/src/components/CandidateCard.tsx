import React, { useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import { Button } from 'antd'

import { useCandidateName } from '../hooks/useCandidateName'
import { useCandidateScore } from '../hooks/useCandidateScore'
import { useVote } from '../hooks/useVote'

interface Props {
  index: number
}
export const CandidateCard = observer(({ index }: Props) => {
  const { name } = useCandidateName(index)
  const { score, fetch } = useCandidateScore(name)
  const { vote, loading } = useVote()
  const voteCallback = useCallback(async () => {
    await fetch()
  }, [fetch])
  return (
    <div className="color-gray-900 bg-white">
      <div className="flex justify-center text-xl font-semibold mb-4 bg-indigo-100 px-4 py-2">
        {name}
      </div>
      <div className="flex justify-center text-5xl font-bold mb-4">{score}</div>
      <div className="flex justify-center mb-4">
        <Button
          onClick={() => {
            if (name) vote(name, voteCallback)
          }}
          type="primary"
          size="large"
          className="bg-indigo-700 hover:bg-indigo-800 outline-none border-0 text-lg font-semibold"
          loading={loading}
        >
          Vote
        </Button>
      </div>
    </div>
  )
})
