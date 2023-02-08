import { useCallback } from 'react'
import { MutationHook } from '@pearl/commerce/utils/types'
import useLogout, { UseLogout } from '@pearl/commerce/auth/use-logout'
import useCustomer from '../customer/use-customer'

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
          disconnect()
          return data
        },
        [fetch, mutate]
      )
    },
}
