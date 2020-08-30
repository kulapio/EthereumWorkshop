import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from '../store'

export const ContractAddress = observer(() => {
  const [addr, setAddr] = useState(store.contractAddress)
  return (
    <div
      className="inline-flex flex-col mx-auto mt-12 items-center p-12"
      style={{ backgroundColor: '#3c366b66' }}
    >
      <div className="text-2xl text-white mb-2">Contract Address</div>
      <input
        value={addr}
        onChange={(e) => {
          setAddr(e.target.value)
        }}
        className="max-w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 text-lg rounded-lg py-4 px-8 block appearance-none leading-normal"
        placeholder="0x1212312121"
        style={{ width: '40rem' }}
      />
      <div className="flex flex-col justify-center items-center mt-6">
        <button
          className="bg-indigo-700 hover:bg-indigo-800 text-lg text-white font-bold py-2 px-4 rounded w-full md:w-64"
          onClick={() => {
            store.updateContractAddress(addr)
          }}
        >
          Load
        </button>
        <a
          href={`https://kovan.etherscan.io/address/${store.contractAddress}`}
          className="underline flex items-baseline text-white text-sm mt-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open on EtherScan
        </a>
      </div>
    </div>
  )
})
