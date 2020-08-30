import React from 'react'
import { observer } from 'mobx-react-lite'
import { store } from '../store'
import { ExternalLink } from '../svg/ExternalLink'

export const ContractAddress = observer(() => {
  return (
    <div
      className="inline-flex flex-col mx-auto mt-12 items-center p-12"
      style={{ backgroundColor: '#3c366b66' }}
    >
      <div className="text-2xl text-white mb-2">Contract Address</div>
      <input
        value={
          store.contractAddress ? (store.contractAddress as string) : undefined
        }
        onChange={(e) => {
          store.updateContractAddress(e.target.value)
        }}
        className="max-w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-2xl rounded-lg py-4 px-8 block appearance-none leading-normal"
        placeholder="0x1212312121"
        style={{ width: '40rem' }}
      />
      <div className="flex items-center mt-6">
        <button className="bg-indigo-700 hover:bg-indigo-800 text-lg text-white font-bold py-2 px-4 rounded w-full md:w-64">
          Load
        </button>
        <a
          href={`https://kovan.etherscan.io/address/${store.contractAddress}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ExternalLink className="w-8 h-8 text-white ml-4" />
        </a>
      </div>
    </div>
  )
})
