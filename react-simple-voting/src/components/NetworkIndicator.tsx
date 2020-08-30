import React from 'react'
import { store } from '../store'
import { useNetId } from '../hooks/useNetId'
import { observer } from 'mobx-react-lite'

export const NetworkIndicator = observer(() => {
  useNetId()
  return (
    <div
      className="fixed bg-white py-2 px-4 z-40"
      style={{ top: '1rem', right: 0 }}
    >
      {store.netId ? (
        <div className="font-semibold">{store.netName}</div>
      ) : (
        <div className="text-gray-600">Loading network...</div>
      )}
    </div>
  )
})
