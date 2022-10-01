import Bundlr from '@bundlr-network/client'
import type { NextApiRequest, NextApiResponse } from 'next'
// todo
// const bundlerHttpAddress = 'http://node1.bundlr.network'
const bundlerHttpAddress = 'https://devnet.bundlr.network'

const currency = 'ethereum'

// todo how to remove privateKey from code and env file
const privateKey =
  '08a6ef685b8ee7fcf57bdfa4ce526b1f599da1c06b373bd3a5bf7f08c79c903d'
const bundlr = new Bundlr(bundlerHttpAddress, currency, privateKey, {
  providerUrl: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = await bundlr.address
  const balance = await bundlr.getLoadedBalance()
  const converted = bundlr.utils.unitConverter(balance)
  // const fundStatus = await bundlr.fund(100_000_000)
  // console.log('fundStatus', fundStatus)
  const result = { address, balance: converted }
  return res.status(200).json(result)
}
