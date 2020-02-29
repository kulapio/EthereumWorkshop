const txDecoder = require('ethereum-tx-decoder');
const abiDecoder = require('abi-decoder');

const abi = [{"constant":false,"inputs":[{"name":"tradingProxyIndex","type":"uint256"},{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minDestAmount","type":"uint256"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minDestAmount","type":"uint256"},{"name":"_tradingPaths","type":"address[]"}],"name":"tradeRoutes","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"tradingProxies","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_proxyAddress","type":"address"}],"name":"addTradingProxy","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tradingProxyIndex","type":"uint256"},{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcAmount","type":"uint256"}],"name":"rate","outputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"etherERC20","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_srcAsset","type":"address"},{"indexed":false,"name":"_srcAmount","type":"uint256"},{"indexed":true,"name":"_destAsset","type":"address"},{"indexed":false,"name":"_destAmount","type":"uint256"},{"indexed":true,"name":"_trader","type":"address"},{"indexed":false,"name":"fee","type":"uint256"}],"name":"Trade","type":"event"}]

async function main() {
  const rawTx = '0xf9011482017f85012a05f2008307a12094cee7eea7e58434997a59049f7da4d0ad46f1f14188016345785d8a0000b8a40e8a47b50000000000000000000000000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000089d24a6b4ccb1b6faa2625fe562bdd9a23260359000000000000000000000000000000000000000000000000000000000000000125a08643497081078eba0d317ee169039d96b88103ca836489154de03f5257c1c0f4a044b21c71d740c65286b42e0d7adcee2992ff28c8ad6c31ba68bace40a4ddd427'
  const decodedTx = txDecoder.decodeTx(rawTx);
  console.log('decodedTx', decodedTx)

  abiDecoder.addABI(abi);
  const testData = decodedTx.data;
  const decodedData = abiDecoder.decodeMethod(testData);

  return decodedData
}

(async () => {
  const result = await main()
  console.log('result', result)
})()
