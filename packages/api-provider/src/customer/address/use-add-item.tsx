import useAddItem, {
  UseAddItem,
} from '@pearl/commerce/customer/address/use-add-item'
import { MutationHook } from '@pearl/commerce/utils/types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {},
  useHook:
    ({ fetch }) =>
    () =>
    async () => ({}),
}
