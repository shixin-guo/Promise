import { MutationHook } from '@vercel/commerce/utils/types'
import useLogin, { UseLogin } from '@vercel/commerce/auth/use-login'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import useCustomer from '../customer/use-customer'
import { setCustomerToken } from '../utils'

export default useLogin as UseLogin<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input: { email, password } }) {
    return await signInWithEmailAndPassword(getAuth(), email, password)
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate, data: customer } = useCustomer()
      return useCallback(
        async function (input) {
          // todo how to add ts type  UserCredential to 'user'
          const { user } = await fetch({ input })
          const jwtToken = await user.getIdToken()
          setCustomerToken(jwtToken)
          await mutate()
          return user
        },
        [fetch]
      )
    },
}
