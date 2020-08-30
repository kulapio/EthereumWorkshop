import React from 'react'
import { observer } from 'mobx-react-lite'
import { useAccounts } from '../hooks/useAccounts'

export const Account = observer(() => {
  const { myAccount, balance } = useAccounts()
  return (
    <div className="p-8 px-16 bg-white text-gray-900 flex flex-col">
      <div className="flex-1">
        <span className="w-16">Account:</span> {myAccount}
      </div>
      <div className="flex-1">
        <span className="w-16">Balance:</span> {balance} ETH
      </div>
    </div>
  )
})
