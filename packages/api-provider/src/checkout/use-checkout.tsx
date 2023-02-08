import { SWRHook } from '@pearl/commerce/utils/types'
import useCheckout, { UseCheckout } from '@pearl/commerce/checkout/use-checkout'

export default useCheckout as UseCheckout<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ useData }) =>
    async (input) => ({}),
}
