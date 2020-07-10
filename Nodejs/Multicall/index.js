const ethers = require('ethers')
const multiCallAddress = '0xeefBa1e63905eF1D7ACbA5a8513c70307C1cE441'
const usdtAddress = '0xdac17f958d2ee523a2206206994597c13d831ec7'
const multiCallAbi = require('./abi//MulticallAbi.json')
const usdtAbi = require('./abi/UsdtAbi.json')
const provider = new ethers.providers.InfuraProvider();
const multiCall = new ethers.Contract(
  multiCallAddress,
  multiCallAbi,
  provider
)
const usdt = new ethers.Contract(
  usdtAddress,
  usdtAbi,
  provider
)

const main = async () => {
  // const balance = await multiCall.getEthBalance('0xF42D2209740A38e30f2F8075763E15fb419fEA30')
  // console.log('balance', balance)
  // console.log('name', await usdt.name())

  let [block, res] = await multiCall.callStatic.aggregate([
    [usdtAddress, usdt.interface.encodeFunctionData('name', [])],
    [usdtAddress, usdt.interface.encodeFunctionData('decimals', [])],
    [usdtAddress, usdt.interface.encodeFunctionData('balanceOf', ['0x3041cbd36888becc7bbcbc0045e3b1f144466f5f'])],
  ])
  const name = usdt.interface.decodeFunctionResult('name', res[0])
  const decimals = usdt.interface.decodeFunctionResult('decimals', res[1]).toString(10)
  const balance = usdt.interface.decodeFunctionResult('balanceOf', res[2]).toString(10)
  console.table({block, name, decimals, balance})
}

(async () => {
  await main()
})()
