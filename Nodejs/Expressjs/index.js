const Web3 = require('web3')
const express = require('express')

const infuraKey = '4e81201d04f84222a663fa0efe57270e'
if ('' === infuraKey) {
  console.error('Please go to https://infura.io to get infuraKey (PROJECT ID)')
  return -1
}
let web3 = new Web3( new Web3.providers.HttpProvider( `https://kovan.infura.io/v3/${infuraKey}` ));

async function getSystemBankBalance() {
  var contractAddress = '0x50a397b04001d663c2bb124e9507b16d8d3e0e1f';
  let abi = [
    {
      "constant": false,
      "inputs": [],
      "name": "deposit",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "withdrawAmount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [
        {
          "name": "remain",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "accountAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DepositMade",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "balance",
      "outputs": [
        {
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
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "systemBalance",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];

  let contract = new web3.eth.Contract(abi, contractAddress)
  const balance = await contract.methods.systemBalance().call();
  return balance
}


const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/bankBalance', async (req, res) => res.send(await getSystemBankBalance()))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
