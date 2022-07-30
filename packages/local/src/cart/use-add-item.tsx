import useAddItem, { UseAddItem } from '@vercel/commerce/cart/use-add-item'
import { MutationHook } from '@vercel/commerce/utils/types'
import { getCustomerToken } from '../utils'
import { getAuth } from 'firebase/auth'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { getFirebaseDb } from '../firebase/clientApp'
import useCart from './use-cart'
import { useCallback } from 'react'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const auth = getAuth()
      const uid = auth.currentUser?.uid
      if (uid) {
        await updateDoc(doc(getFirebaseDb(), 'customer', uid), {
          cart: arrayUnion(input),
        })
        return null
      }
    }
    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCart()
      return useCallback(
        async function addItem(input) {
          await fetch({ input })
          await mutate()
          return
        },
        [fetch, mutate]
      )
    },
}
