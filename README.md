# EthereumWorkshop

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

### Live demo here
- [https://dev.kulap.io/workshop/smartcontract/simplevote/SimpleVoting.html](https://dev.kulap.io/workshop/smartcontract/simplevote/SimpleVoting.html)

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
