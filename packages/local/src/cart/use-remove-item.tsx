import { MutationHook } from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import { useCallback } from 'react'
import useCart from './use-cart'
import { getCustomerToken } from '../utils'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayRemove } from 'firebase/firestore'

import { firebaseDb } from '../firebase/clientApp'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const auth = getAuth()
      const uid = auth.currentUser?.uid
      if (uid) {
        const { productId, variantId } = input
        await updateDoc(doc(firebaseDb, 'customer', uid), {
          cart: arrayRemove({
            productId,
            variantId,
          }),
        })
        return
      }
    }
    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()
      return useCallback(
        async function removeItem(input) {
          await fetch({ input })
          await mutate()
          return
        },
        [fetch, mutate]
      )
    },
}
