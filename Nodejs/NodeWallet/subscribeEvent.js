const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer


const infuraKey = '2b2ecc02f32c4f6fbf4f220caacc532c'
if ('' === infuraKey) {
  console.error('Please go to https://infura.io to get infuraKey (PROJECT ID)')
  return -1
}
const ChainInfo = {
  mainnet: {
    name: 'mainnet'
  },
  rinkeby: {
    name: 'rinkeby'
  },
  kovan: {
    name: 'kovan'
  }
}
const ChainConfig = ChainInfo.kovan
const web3 = new Web3(`wss://${ChainConfig.name}.infura.io/ws/v3/${infuraKey}`);

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function subscribeEvent() {
  const contractAddress = '0xC4af0e3655997b2b38563b613E1379820dA4ac8C'
  const abi = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "candidateNames",
          "type": "string[]"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "voteForCandidate",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "VoteReceived",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "candidateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidateList",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "string",
          "name": "candidate",
          "type": "string"
        }
      ],
      "name": "totalVotesFor",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]

  // load contract
  let contract = new web3.eth.Contract(abi, contractAddress)

  console.log('candidateCount: ', await contract.methods.candidateCount().call())

  // subscribe to event
  contract.events.VoteReceived()
  .on("connected", function(subscriptionId){
    console.log(subscriptionId);
  })
  .on('data', async (event) => {
    console.log(event)
  })

  await sleep(10000000);
}

(async () => {
  await subscribeEvent()
})()
