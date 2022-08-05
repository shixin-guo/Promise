import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import { getCustomerToken } from '../utils'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { getFirebaseDb } from '../firebase/clientApp'

export default useCart as UseCart<typeof handler>
export const handler: SWRHook<any> = {
  fetchOptions: {
    url: '/cart',
  },
  async fetcher() {
    const customerAccessToken = getCustomerToken()
    if (customerAccessToken) {
      const auth = getAuth()
      const uid = auth.currentUser?.uid
      if (uid) {
        const user = await getDoc(doc(getFirebaseDb(), 'customer', uid))
        const customerCart = user.data()?.cart || []
        let lineItems: any = []
        let subtotalPrice = 0
        // todo optimize later
        await Promise.all(
          customerCart.map(
            async ({
              productId,
              variantId,
            }: {
              productId: string
              variantId: string
            }) => {
              // todo difference variant and product price
              const refData = await (
                await getDoc(doc(getFirebaseDb(), 'collections', productId))
              ).data()
              if (refData) {
                lineItems.push({
                  id: productId,
                  variantId: variantId,
                  productId: productId,
                  name: refData.name,
                  quantity: 1,
                  tokenID: refData.tokenID,
                  discounts: [],
                  path: refData.name,
                  variant: {
                    price: refData.price.value,
                  },
                })
                subtotalPrice = subtotalPrice + refData.price.value
              }
            }
          )
        )
        // todo
        return {
          id: uid,
          createdAt: new Date(),
          currency: { code: 'USD' },
          taxesIncluded: '',
          lineItems,
          lineItemsSubtotalPrice: '',
          subtotalPrice: subtotalPrice,
          totalPrice: subtotalPrice,
        }
      }

      return
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
