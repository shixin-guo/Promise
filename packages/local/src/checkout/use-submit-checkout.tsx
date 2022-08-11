import { ethers } from 'ethers'

import { useConnect, useContract, useSigner } from 'wagmi'
import { useAccount } from 'wagmi'
// todo put into a util file
// todo whether need use online prod json and address
import { marketplaceAddress } from '../../../../packages/contract/config'
import NFTMarketplace from '../../../../packages/contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import type { MutationHook } from '@vercel/commerce/utils/types'

import { useCallback, useEffect } from 'react'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'
import useRemoveItem from '../cart/use-remove-item'
import useCart from '../cart/use-cart'
export default useSubmitCheckout as UseSubmitCheckout<typeof handler>

export const handler: MutationHook<SubmitCheckoutHook> = {
  fetchOptions: {
    url: '/api/checkout',
    method: 'POST',
  },
  async fetcher(a) {
    console.log('checkout fetcher', a)
    return {}
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { data: signer } = useSigner()
      const removeItemFromCart = useRemoveItem()
      const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
      const { data: cartData, mutate: refreshCart } = useCart()
      const cartItem = cartData.lineItems
      const contract = useContract({
        addressOrName: marketplaceAddress,
        contractInterface: NFTMarketplace.abi,
        signerOrProvider: signer,
      })
      console.log(signer)
      // useEffect(() => {
      //   console.log('checkout signer', signer)
      // }, [signer])

      return useCallback(
        async function onSubmitCheckout() {
          cartItem.map(async (nft: any) => {
            const price = ethers.utils.parseUnits(
              nft.variant.price.toString(),
              'ether'
            )
            const transaction = await contract.createMarketSale(nft.tokenID, {
              value: price,
            })

            await transaction.wait()
            await await fetch(nft)
            await removeItemFromCart(nft)
          })
          return {}
        },
        [fetch, contract]
      )
    },
}
