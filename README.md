# EthereumWorkshop

<img width="1631" alt="Screen Shot 2562-09-24 at 12 43 08" src="https://user-images.githubusercontent.com/459912/65484242-febaef00-dec8-11e9-9732-607a4990bdb8.png">

## Understand Solidity
1. Variables and Types
2. Solidity Events
3. Function Modifiers
4. Mappings and Structs
5. Inheritance & Deployment

## Deploy Simple Voting
- Copy content of file Smart contarct/SimpleVoting.sol
- Open remix ide at https://remix.ethereum.org
- New file and put the code from first step (Smart contarct/SimpleVoting.sol)
- Click run
- Expand deploy panel
- candidateNames = ["Liverpool", "Manchester United", "Manchester City", "Arsenal"]
- transact
- Done!

## Run Simple Voting
- We need webserver to run our DApp so we have 2 simple solutions here.

### First solution - Chrome extension
- Install chrome extesion https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en
- Open
- Choose folder
- Select "DApp"
- Open http://127.0.0.1:8887 (open the link on web server url)
- Click "SimpleVoting.html"

### Second solution - use python
- cd DApp/
- run: python -m SimpleHTTPServer 8080
- Open http://localhost:8080
- Click "SimpleVoting.html"

### Third solution - use docker
```sh
#!/bin/sh
set -x
docker rm -f simplevote
docker run --name simplevote -p 8080:80 -v $PWD/DApp:/usr/share/nginx/html:ro -d nginx:alpine
set +x
echo "Go to http://localhost:8080/SimpleVoting.html"
```

### Live demo ( with jQuery )
- [https://dev.kulap.io/workshop/smartcontract/simplevote/SimpleVoting.html](https://dev.kulap.io/workshop/smartcontract/simplevote/SimpleVoting.html)

### Live demo ( with Vuejs )
- [https://dev.kulap.io/workshop/vuejs/simplevote/](https://dev.kulap.io/workshop/vuejs/simplevote/)

## Deploy your own ERC-20 token
- Copy content of file Smart contarct/ERC20Token.sol
- Open remix ide at https://remix.ethereum.org
- New file and put the code from first step (Smart contarct/ERC20Token.sol)
- Click run
- Choose ERC20Token
- Expand deploy panel
- _name = YOUR_COIN_NAME
- _symbol = YOUR_COIN_SHORTNAME
- _decimals = 2
- transact
- Done!

# Besu
## Config
genesis.json
```
{
  "config":{
    "chainId":2021,
    "muirglacierblock": 0,
    "clique":{
      "blockperiodseconds":3,
      "epochlength":30000
    }
  },
  "coinbase":"0x0000000000000000000000000000000000000000",
  "difficulty":"0x1",
  "extraData":"0x0000000000000000000000000000000000000000000000000000000000000000e40C18dF9d7fA29d758947488Ae0A0B18000A99E0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "gasLimit":"0x1fffffffffffff",
  "mixHash":"0x0000000000000000000000000000000000000000000000000000000000000000",
  "nonce":"0x0",
  "timestamp":"0x5c51a607",
  "alloc": {
    "950807aeaCCb5E66DC09e9F99A7d559A880D8b14": {
      "balance": "0xad78ebc5ac6200000"
    }
  },
  "number":"0x0",
  "gasUsed":"0x0",
  "parentHash":"0x0000000000000000000000000000000000000000000000000000000000000000"
}
```

run
```
docker run --name besu-clique -d --mount type=bind,source=/home/ec2-user/besu/clique,target=/var/lib/besu \
-p 8545:8545 -p 8546:8546 hyperledger/besu:latest \
--rpc-http-cors-origins="all" --host-allowlist="*" \
--rpc-http-host="0.0.0.0" --rpc-http-enabled --rpc-ws-enabled \
--data-path=/var/lib/besu --node-private-key-file=/var/lib/besu/key --genesis-file=/var/lib/besu/genesis.json
```
