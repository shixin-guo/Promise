import { default as NextImage } from 'next/image'
import { useState, useRef } from 'react'
import { ethers, providers } from 'ethers'
import {
  useContract,
  useSigner,
  useAccount,
  useConnect,
  useProvider,
} from 'wagmi'
import { useRouter } from 'next/router'
import { RcFile } from '@components/ui/Upload/interface'
import { Info } from '@components/icons'
import { Layout } from '@components/common'
import { Button, Text, Container, Upload, Input } from '@components/ui'
import { WebBundlr } from '@bundlr-network/client'
// @ts-ignore
import fileReaderStream from 'filereader-stream'

// todo whether need use online prod json and address
import NFTMarketplace from '../../../packages/contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'

const UploadIcon = '/image.svg'
interface FormInputInterface {
  name: string
  description: string
  price: string
  file: RcFile | null
}
const defaultFormInput = {
  price: '',
  name: '',
  description: '',
  file: null,
}
const uploadTypeLimitList = [
  '.png',
  '.jpg',
  '.jpeg',
  '.avig',
  '.apng',
  '.webp',
  '.jpeg',
  '.gif',
  '.svg',
  '.svg',
]
export default function CreatePage() {
  const router = useRouter()
  const [formInput, updateFormInput] =
    useState<FormInputInterface>(defaultFormInput)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isConnected } = useAccount()
  const { data: signer } = useSigner()
  // const provider = useProvider()
  // const currency = 'ethereum'

  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_MARKETPLACEADDRESS || '',
    contractInterface: NFTMarketplace.abi,
    signerOrProvider: signer,
  })
  // const initBundlr = async () => {
  //   if (signer) {
  //     // todo move into env file
  //     // const bundlerHttpAddress = 'http://node1.bundlr.network'
  //     const bundlerHttpAddress = 'https://devnet.bundlr.network'
  //     const Bundlr = new WebBundlr(bundlerHttpAddress, currency, provider, {
  //       providerUrl: 'http://127.0.0.1:8545/',
  //       contractAddress: '',
  //     })
  //     await Bundlr.utils.getBundlerAddress(currency)
  //     await Bundlr.ready()
  //     return Bundlr
  //   }
  // }

  const [base64URL, setBase64URL] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const beforeUnloadEvent = async (file: RcFile) => {
    updateFormInput({
      ...formInput,
      file,
    })
    getBase64(file, (url) => {
      setBase64URL(url)
    })
    return false
  }
  const lazyRoot = useRef(null)

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  async function uploadToArweave() {
    setLoading(true)
    // const bundlr = await initBundlr()

    // Get the cost for upload

    const { file } = formInput
    // test
    debugger
    const resA = await fetch('/api/upload', {
      method: 'POST',
      body: file,
    })
    const resB = await resA.json()
    console.log(resB)
    debugger
    // test
    // const stream = fileReaderStream(file)

    // const uploader = bundlr!.uploader.chunkedUploader

    // uploader?.setBatchSize(2)
    // uploader?.setChunkSize(2_000_000)
    // uploader?.on('chunkUpload', (e) => {
    //   console.log(e)
    // })

    // const res = await uploader.uploadData(stream, {
    //   tags: [
    //     {
    //       name: 'Content-Type',
    //       value: file?.type ?? 'application/octet-stream',
    //     },
    //   ],
    // })
    // return res.data.id
  }

  async function listNFT2Chain() {
    const { name, description, price: inputPrice } = formInput
    if (!(name && description && inputPrice && base64URL)) {
      setErrorMessage('Please fill in all fields')
      return
    }
    const fileUrl = await uploadToArweave()
    debugger
    const price = ethers.utils.parseUnits(inputPrice, 'ether')
    const listingPrice = await contract.getListingPrice()
    let transaction = await contract.createToken(
      formInput.name,
      price,
      fileUrl,
      {
        value: listingPrice.toString(),
      }
    )
    await transaction.wait()
    setLoading(false)
    router.push('/orders')
    // todo
    // const tokenID = transactionResult?.events
    //   ?.find((item: any) => item.event === 'MarketItemCreated')
    //   .args[0].toString()
    // const tokenID = await contract.getCreateTokenId()
  }

  async function listNFTForSale() {
    setErrorMessage('')
    setLoading(true)
    await listNFT2Chain()
    updateFormInput(defaultFormInput)
  }
  function handleUploadError(e: Error) {
    console.log(e)
    setLoading(false)
  }
  return (
    <Container className="pt-4 pb-4 flex justify-center">
      <div className="mb-20 max-w-4xl p-6">
        <Text variant="pageHeading">Create a NFT</Text>
        <div className="group flex flex-col">
          {!isConnected &&
            connectors.map((connector) => (
              <button
                // disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect({ connector })}
              >
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  ' (connecting)'}
              </button>
            ))}
          <label className="text-base font-semibold my-1">Image</label>
          <p className="text-xs mb-2 text-gray-500">
            File types supported{' '}
            {uploadTypeLimitList
              .map((ext) => ext.replace('.', '').toUpperCase())
              .join(', ')}
          </p>
          <Upload
            ref={lazyRoot}
            className="h-60 rounded-lg bg-gray-400  flex items-center justify-center border-dashed border-4 border-gary-800 hover:opacity-75 w-full"
            accept={uploadTypeLimitList.join()}
            action="https://httpbin.org/post"
            beforeUpload={beforeUnloadEvent}
            onError={handleUploadError}
          >
            {base64URL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={base64URL}
                alt="avatar"
                className="object-fill h-full"
              />
            ) : (
              <div className="flex items-center flex-col">
                <p className="text-white">Drag, Paste or Click</p>
                <NextImage
                  className="rounded-lg"
                  width={60}
                  height={60}
                  src={UploadIcon}
                  alt={'Product Image'}
                />
              </div>
            )}
          </Upload>
          <label className="text-base font-semibold my-1">Name:</label>
          <Input
            className="w-full border-2 border-gray-300 rounded-lg p-2"
            placeholder="Input Item Name"
            onChange={(value) => updateFormInput({ ...formInput, name: value })}
          />
          <label className="text-base font-semibold my-1">Description:</label>
          <Input
            className="w-full border-2 border-gray-300 rounded-lg p-2"
            placeholder="Provide a detailed description of your item."
            onChange={(value) => {
              updateFormInput({ ...formInput, description: value })
            }}
          />
          <label className="text-base font-semibold my-1">Price:</label>

          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <Input
              type="text"
              name="price"
              id="price"
              placeholder="0.00"
              className="w-full border-2 border-gray-300 rounded-lg p-2"
              onChange={(value) => {
                updateFormInput({ ...formInput, price: value })
              }}
            />
          </div>
          <Button
            className="mt-2 rounded-lg"
            onClick={listNFTForSale}
            disabled={!(loading || (formInput.price && formInput.file))}
            loading={loading}
          >
            List NFT
          </Button>
          {errorMessage && (
            <>
              <span className="text-accent-8">
                <span className="inline-block align-middle ">
                  <Info width="15" height="15" />
                </span>{' '}
                <span className="leading-6 text-sm">
                  <strong>Info</strong>: {errorMessage}{' '}
                </span>
              </span>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}

CreatePage.Layout = Layout
