import { ethers } from 'ethers'

import { useConnect, useContract, useSigner } from 'wagmi'

// todo put into a util file
// todo whether need use online prod json and address
import { marketplaceAddress } from '../../../../packages/contract/config'
import NFTMarketplace from '../../../../packages/contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import type { MutationHook } from '@vercel/commerce/utils/types'

import { useCallback } from 'react'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'

export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    url: '/api/checkout',
    method: 'POST',
  },
  async fetcher({}) {
    return {}
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { data: signer } = useSigner()

      const contract = useContract({
        addressOrName: marketplaceAddress,
        contractInterface: NFTMarketplace.abi,
        signerOrProvider: signer,
      })

      return useCallback(
        async function onSubmitCheckout(input) {
          console.log(input)
          // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')
          // const transaction = await contract.createMarketSale(nft.tokenId, {
          //   value: price,
          // })
          // return await transaction.wait()
          // loadNFTs()

          return {}
        },
        [fetch]
      )
    },
}
