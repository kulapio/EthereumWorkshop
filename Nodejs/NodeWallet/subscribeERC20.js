const Web3 = require('web3')
const Tx = require('ethereumjs-tx').Transaction
const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer


const infuraKey = ''
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
const ChainConfig = ChainInfo.rinkeby
const web3 = new Web3(`wss://${ChainConfig.name}.infura.io/ws/v3/${infuraKey}`);

const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function subscribeEvent() {
  const contractAddress = '0x726E9260ff66aeC20a58e126b393F17696C46402'
  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "from",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "to",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
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
      "constant": false,
      "inputs": [
        {
          "internalType": "address",
          "name": "_to",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  // load contract
  let contract = new web3.eth.Contract(abi, contractAddress)

  // subscribe to event
  contract.events.Transfer()
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
