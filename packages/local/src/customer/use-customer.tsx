import { SWRHook } from '@vercel/commerce/utils/types'
import { doc, getDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebase/clientApp'
import useCustomer, {
  UseCustomer,
} from '@vercel/commerce/customer/use-customer'
import { getCustomerToken } from '../utils'
import { getAuth } from 'firebase/auth'

export default useCustomer as UseCustomer<typeof handler>
export const handler: SWRHook<any> = {
  // todo if fetchOptions is same , swr will get same data, so use-cart and use-customer will get same data, should figure out later
  fetchOptions: {
    url: '/customer',
  },
  async fetcher({ input, options, fetch }) {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const auth = getAuth()
      const uid = auth.currentUser?.uid
      if (uid) {
        const docSnap = await getDoc(doc(getFirebaseDb(), 'customer', uid))
        return { ...docSnap.data(), uid }
      }
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      return useData({
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })
    },
}
