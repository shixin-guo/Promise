import Bundlr from '@bundlr-network/client'
import { IncomingForm, PersistentFile } from 'formidable'
import BigNumber from 'bignumber.js'
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
const bundlerHttpAddress = process.env.NEXT_PUBLIC_BUNDLER_HTTP_ADDRESS!
const currency = 'ethereum'
const privateKey = process.env.NEXT_PUBLIC_ARWEARE_ACCOUNT_PRIVATE_KEY
const bundlr = new Bundlr(bundlerHttpAddress, currency, privateKey, {
  providerUrl: process.env.NEXT_PUBLIC_INFURA_RPC_URL,
})
const uploader = bundlr.uploader.chunkedUploader
// todo auto fund
const fundBundlr = async (dataSize: number): Promise<void> => {
  const price = await bundlr.getPrice(dataSize)
  const balance = await bundlr.getLoadedBalance()
  // Multiply by 1.1 to make sure we don't run out of funds
  const adjustedPrice = price.multipliedBy(1.1)

  if (adjustedPrice.isGreaterThan(balance)) {
    console.log(
      'Funding Bundlr Node...',
      'adjustedPrice: ',
      adjustedPrice.toString(),
      'balance: ',
      balance.toString()
    )
    await bundlr.fund(
      adjustedPrice.minus(balance).integerValue(BigNumber.ROUND_CEIL)
    )
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const form = new IncomingForm()
    const data = await new Promise((res, rej) => {
      form.parse(req, function (err, fields, files) {
        if (err) rej(err)
        res({ fields, files })
      })
    })
    const { files, fields } = data
    const image = files.image
    const creator = fields.creator
    const contentType: string | null = image.mimetype
    const transactionOptions = contentType
      ? {
          tags: [
            { name: 'Content-Type', value: contentType },
            { name: 'app', value: 'ZNFT' },
            { name: 'creator', value: creator },
          ],
        }
      : {}
    const bufferFile = await new Promise((res, rej) => {
      fs.readFile(image.filepath, (err, data) => {
        res(data)
      })
    })
    const response = await uploader.uploadData(bufferFile, transactionOptions)
    return res.status(200).json(`https://arweave.net/${response.data.id}`)
  } catch (e) {
    console.log(e)
    return res.status(400).json(JSON.stringify(e))
  }
}
