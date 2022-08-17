import { useCallback } from 'react'
import { MutationHook } from '@vercel/commerce/utils/types'
import useLogout, { UseLogout } from '@vercel/commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'
import { setCustomerToken } from '../utils'
import { useDisconnect } from 'wagmi'
export default useLogout as UseLogout<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher() {
    return null
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useCustomer()
      const { disconnect } = useDisconnect()
      return useCallback(
        async function logout() {
          const data = await fetch()
          await mutate(null, false)
          setCustomerToken('')
          disconnect()
          return data
        },
        [fetch, mutate]
      )
    },
}
