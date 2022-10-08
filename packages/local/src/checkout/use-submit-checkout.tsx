import { ethers } from 'ethers'
import { useConnect, useContract, useSigner, useAccount } from 'wagmi'

// todo put into a util file
// todo whether need use online prod json and address
import NFTMarketplace from '../../../../packages/contract/artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json'
import type { SubmitCheckoutHook } from '@vercel/commerce/types/checkout'
import type { MutationHook } from '@vercel/commerce/utils/types'
import { doc, updateDoc } from 'firebase/firestore'

import { firebaseDb } from '../firebase/clientApp'
import { useCallback, useEffect } from 'react'
import useSubmitCheckout, {
  UseSubmitCheckout,
} from '@vercel/commerce/checkout/use-submit-checkout'
import useRemoveItem from '../cart/use-remove-item'
import useCart from '../cart/use-cart'
import { useRouter } from 'next/router'

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
      const { address } = useAccount()
      const router = useRouter()

      const { data: signer } = useSigner()
      const removeItemFromCart = useRemoveItem()
      const { connect, connectors, error, isLoading, pendingConnector } =
        useConnect()
      const { data: cartData, mutate: refreshCart } = useCart()
      const cartItem = cartData.lineItems
      const contract = useContract({
        addressOrName: process.env.NEXT_PUBLIC_MARKETPLACEADDRESS || '',
        contractInterface: NFTMarketplace.abi,
        signerOrProvider: signer,
      })
      return useCallback(
        async function onSubmitCheckout() {
          cartItem.map(async (nft: any) => {
            const price = ethers.utils.parseUnits(
              nft.variant.price.toString(),
              'ether'
            )
            const transaction = await contract.buyToken(nft.tokenID, {
              value: price,
            })
            await transaction.wait()
            await await fetch(nft)
            await removeItemFromCart(nft)
            const washingtonRef = doc(firebaseDb, 'collections', nft.id)
            await updateDoc(washingtonRef, {
              arthur: address,
            })
            router.push('/orders')
          })
          return {}
        },
        [fetch, contract]
      )
    },
}
