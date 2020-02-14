const util = require('ethereumjs-util');   
const Buffer = require('safe-buffer').Buffer
const secp256k1 = require('secp256k1')

async function main() {
  const account = {
    // "address":"0x55509eC248c859e15293189548a8b79E2306e0CD",
    "privateKey":"4f361e3b2c678f9f8418d530b116fb7d28d143a86f7cdd8dfd8c80aeaf936b0a"
  }

  const privateKey = Buffer.from(account.privateKey, 'hex')
  const publicKey = Buffer.from(secp256k1.publicKeyCreate(privateKey, false).slice(1), 'hex').toString('hex')
  const address = util.publicToAddress('0x' + publicKey).toString('hex')
  const address2 = util.keccak256(Buffer.from(publicKey, 'hex')).slice(-20).toString('hex')

  console.log('privateKey:', privateKey)
  console.log('publicKey:', publicKey)
  console.log('address:', address)
  console.log('address2:', address2)

  return true
}


(async () => {
  const result = await main()
  console.log('result', result)
})()
