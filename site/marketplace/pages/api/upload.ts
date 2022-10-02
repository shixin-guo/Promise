import Bundlr from '@bundlr-network/client'
import { IncomingForm, PersistentFile } from 'formidable'
import BigNumber from 'bignumber.js'
import fs from 'fs'
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
const uploader = bundlr.uploader.chunkedUploader
// todo auto fund
const fundBundlr = async (dataSize: number): Promise<void> => {
  const price = await bundlr.getPrice(dataSize)
  const balance = await bundlr.getLoadedBalance()
  // Multiply by 1.1 to make sure we don't run out of funds
  const adjustedPrice = price.multipliedBy(1.1)

  if (adjustedPrice.isGreaterThan(balance)) {
    console.log('Funding Bundlr Node')
    // console.log(adjustedPrice.toString(), balance.toString());
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
