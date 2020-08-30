import { useMemo } from 'react'
import { store } from '../store'

const abi = [
  {
    constant: false,
    inputs: [
      {
        internalType: 'string',
        name: 'candidate',
        type: 'string',
      },
    ],
    name: 'voteForCandidate',
    outputs: [],
    payable: false,
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string[]',
        name: 'candidateNames',
        type: 'string[]',
      },
    ],
    payable: false,
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'candidate',
        type: 'string',
      },
    ],
    name: 'VoteReceived',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'candidateCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'candidateList',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [
      {
        internalType: 'string',
        name: 'candidate',
        type: 'string',
      },
    ],
    name: 'totalVotesFor',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]

export const useContract = () => {
  const web3 = store.web3
  const addr = store.contractAddress
  const contract = useMemo(() => {
    if (!web3) return null
    try {
      const c = new web3.eth.Contract(abi as any, addr)
      return c
    } catch (err) {
      console.warn(err)
      return null
    }
  }, [web3, addr])
  return contract
}
