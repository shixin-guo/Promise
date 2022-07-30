import type { AddItemHook } from '@vercel/commerce/types/customer/card'
import type { MutationHook } from '@vercel/commerce/utils/types'

import { useCallback } from 'react'
import useAddItem, {
  UseAddItem,
} from '@vercel/commerce/customer/card/use-add-item'

import { useCheckoutContext } from '@components/checkout/context'
export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/customer/card',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    const data = await fetch({
      ...options,
      body: { item },
    })

    return data
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { setCardFields } = useCheckoutContext()
      return useCallback(
        async function addItem(input) {
          setCardFields(input)
          return undefined
        },
        [setCardFields]
      )
    },
}
