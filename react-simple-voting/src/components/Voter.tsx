import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useCandidateCount } from '../hooks/useCandidateCount'
import { CandidateCard } from './CandidateCard'

export const Voter = observer(() => {
  const { count } = useCandidateCount()
  const arr = useMemo(() => Array.from(new Array(count), (x, i) => i), [count])
  return (
    <div className="p-16 bg-indigo-900">
      <div className="text-xl mb-12 text-white">
        Candidates Count: <b>{count}</b>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {arr.map((idx) => (
          <CandidateCard index={idx} key={idx} />
        ))}
      </div>
    </div>
  )
})
