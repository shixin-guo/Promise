import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import useCart from '../cart/use-cart'
import useWishlist from '../wishlist/use-wishlist'
import { MutationHook } from '@vercel/commerce/utils/types'
import useSignup, { UseSignup } from '@vercel/commerce/auth/use-signup'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'
import { firebaseDb } from '../firebase/clientApp'
import { setCustomerToken } from '../utils'

export default useSignup as UseSignup<typeof handler>

const createUser = async ({ email, password, firstName, lastName }: any) => {
  const auth = getAuth()
  const userCredentialImpl = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
  try {
    await setDoc(doc(firebaseDb, 'customer', userCredentialImpl.user.uid), {
      firstName,
      lastName,
      email,
    })
  } catch (e) {
    console.error('Error adding document: ', e)
  }

  return userCredentialImpl.user
}
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    return createUser(input)
  },
  useHook:
    ({ fetch }) =>
    () => {
      const customer = useCustomer()
      const cart = useCart()
      const wishlist = useWishlist()
      return useCallback(
        async function signup(input) {
          const user = await fetch({ input })
          const jwtToken = await user.getIdToken()
          setCustomerToken(jwtToken)
          await customer.mutate()
          // await cart.mutate()
          // await wishlist.mutate()
          return user
        },
        [customer, cart, wishlist]
      )
    },
}
