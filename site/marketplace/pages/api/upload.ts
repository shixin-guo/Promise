import Bundlr from '@bundlr-network/client'
import type { NextApiRequest, NextApiResponse } from 'next'
// const bundlerHttpAddress = 'http://node1.bundlr.network'
const bundlerHttpAddress = 'https://devnet.bundlr.network'

const currency = 'ethereum'
// const currency = 'chainlink'
// todo how to remove privateKey from code and env file
const privateKey =
  '08a6ef685b8ee7fcf57bdfa4ce526b1f599da1c06b373bd3a5bf7f08c79c903d'
const bundlr = new Bundlr(bundlerHttpAddress, currency, privateKey, {
  providerUrl: 'https://rinkeby.infura.io/v3/',
  contractAddress: '0x11D634457F99595aBE7B582739fd52b7ed48995A',
  //   contractAddress: '0x01BE23585060835E02B77ef475b0Cc51aA1e0709',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = await bundlr.address
  const balance = await bundlr.getLoadedBalance()
  const converted = bundlr.utils.unitConverter(balance)
  const fundStatus = await bundlr.fund(100_000_000)
  console.log('fundStatus', fundStatus)
  const result = { address, balance: converted }
  return res.status(200).json(result)
}