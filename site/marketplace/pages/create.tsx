import type { GetStaticPropsContext } from 'next'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import useSearch from '@framework/product/use-search'
import { collection, addDoc } from 'firebase/firestore'
import { snakeCase } from 'lodash'
import { ethers } from 'ethers'
import { useContract, useSigner, useAccount, useConnect } from 'wagmi'
import { create as createIpfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import zoomsdk from '@zoom/appssdk'

import useCustomer from '@framework/customer/use-customer'
import { firebaseDb } from '@framework/firebase/clientApp'
import { RcFile } from '@components/ui/Upload/interface'
import { Info } from '@components/icons'
import { Layout } from '@components/common'
import { Button, Text, Container, Upload, Input } from '@components/ui'

// todo remove all server or api to local use provider todo  api operation
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'

// todo whether need use online prod json and address
import { marketplaceAddress } from '../../../packages/contract/config'
import NFTMarketplace from '../../../packages/contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import { createZoomConfig } from '@lib/zoom'

const UploadIcon = '/upload.svg'
const IpfsHttpClient = createIpfsHttpClient({
  url: 'https://ipfs.infura.io:5001/api/v0',
})

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  return {
    props: {},
  }
}

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
export default function CreatePage() {
  const router = useRouter()
  const { data: customer } = useCustomer()
  const { mutate: updateSearch } = useSearch({ isMy: true })
  const fileUrlRef = useRef('')
  const [formInput, updateFormInput] =
    useState<FormInputInterface>(defaultFormInput)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const { isConnected } = useAccount()
  const { data: signer } = useSigner()
  useEffect(() => {
    console.log('signer', signer)
  }, [signer])
  // zoom screenshot
  useEffect(() => {
    createZoomConfig()
  }, [])
  const { connect, connectors, isLoading, pendingConnector } = useConnect()
  const contract = useContract({
    addressOrName: marketplaceAddress,
    contractInterface: NFTMarketplace.abi,
    signerOrProvider: signer,
  })
  const metadata = {
    contentType: 'image/jpeg',
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
  const [base64URL, setBase64URL] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  // Upload file and metadata to the object 'images/mountains.jpg'
  const storage = getStorage()
  const storageRef = ref(storage, 'images/' + formInput.name)
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
  async function uploadToGoogleStorage({ tokenID }: { tokenID: String }) {
    // todo  move into local provider
    const uploadTask = uploadBytesResumable(
      storageRef,
      formInput.file as File,
      metadata
    )
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused')
            break
          case 'running':
            console.log('Upload is running')
            break
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break
          case 'storage/canceled':
            // User canceled the upload
            break

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((firestoreUrl) => {
          const { name, description, price } = formInput
          // todo add type Cart
          addDoc(collection(firebaseDb, 'collections'), {
            name,
            id: name,
            tokenID,
            path: snakeCase(name),
            description,
            price: {
              value: Number(price),
              currencyCode: 'USD',
            },
            images: [
              {
                url: firestoreUrl,
              },
            ],
            arthur: customer.uid,
            variants: [
              {
                id: name,
                options: [
                  {
                    id: 'asd',
                    displayName: 'Size',
                    values: [
                      {
                        label: 'XL',
                      },
                    ],
                  },
                ],
              },
            ],
            options: [
              {
                id: 'option-color',
                displayName: 'Color',
                values: [
                  {
                    label: 'color',
                    hexColors: ['#222'],
                  },
                ],
              },
            ],
          })
        })
      }
    )
  }
  async function uploadToIPFS() {
    const { name, description, price, file } = formInput
    setLoading(true)
    try {
      const addedIpfsFile = await IpfsHttpClient.add(file as RcFile, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      const fileUrl = `https://ipfs.infura.io/ipfs/${addedIpfsFile.path}`
      fileUrlRef.current = fileUrl
    } catch (error) {
      setLoading(false)
      console.error('Error uploading file: ', error)
      return
    }
    const fileUrl = fileUrlRef.current
    if (!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    })
    try {
      const addedIpfsFile = await IpfsHttpClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${addedIpfsFile.path}`
      setLoading(false)
      return url
    } catch (error) {
      console.error('Error uploading file info: ', error)
      setLoading(false)
    }
  }
  function validate() {
    const { name, description, price } = formInput

    if (!name || !description || !price || !base64URL) {
      return false
    }
    return true
  }
  async function listNFT2Chain() {
    // const url = await uploadToIPFS()
    const price = ethers.utils.parseUnits(formInput.price, 'ether')
    let listingPrice = await contract.getListingPrice()
    listingPrice = listingPrice.toString() || 1
    let transaction = await contract.createToken(formInput.name, price, {
      value: listingPrice,
    })
    const transactionResult = await transaction.wait()
    const tokenID = transactionResult?.events
      ?.find((item: any) => item.event === 'MarketItemCreated')
      .args[0].toString()
    // const tokenID = await contract.getCreateTokenId()
    return {
      price,
      tokenID,
    }
  }

  async function listNFTForSale() {
    if (!validate()) {
      setErrorMessage('Please fill in all fields')
      return
    }
    setErrorMessage('')
    const { tokenID } = await listNFT2Chain()
    await uploadToGoogleStorage({
      tokenID,
    })
    updateFormInput(defaultFormInput)
    updateSearch()
    router.push('/orders')
  }
  return (
    <Container className="pt-4 pb-4 flex justify-center">
      <div className="mb-20 max-w-4xl p-6">
        <Text variant="pageHeading">Create a NFT</Text>
        <div className="group flex flex-col">
          {!isConnected &&
            connectors.map((connector) => (
              <button
                disabled={!connector.ready}
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
          <label className="text-base font-semibold my-1">Upload Image:</label>
          <Upload
            ref={lazyRoot}
            className="w-80 h-48 rounded-lg bg-gray-400  flex items-center justify-center border-dashed border-4 border-gary-800 hover:opacity-75"
            accept={uploadTypeLimitList.join()}
            action="https://httpbin.org/post"
            beforeUpload={beforeUnloadEvent}
            onError={(error: Error) => {
              console.log(error, 'error')
            }}
          >
            {base64URL ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={base64URL} alt="avatar" className="object-fill" />
            ) : (
              <Image
                className="rounded-lg"
                width={60}
                height={60}
                src={UploadIcon}
                alt={'Product Image'}
              />
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
            {/* <div className="absolute inset-y-0 right-0 flex items-center">
              <label htmlFor="currency" className="sr-only">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className=" h-full py-0  px-2 mr-2 border-transparent bg-transparent text-gray-500 sm:text-base rounded-md"
              >
                <option>ETH</option>
                <option>MATIC</option>
                <option>EUR</option>
              </select>
            </div> */}
          </div>
          <Button
            className="mt-1"
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
