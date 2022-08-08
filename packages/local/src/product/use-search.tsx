import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { firebaseDb } from '../firebase/clientApp'
import { Product } from '@vercel/commerce/types/product'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'

const collectionsRef = collection(firebaseDb, 'collections')

export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const sortMap = new Map([
      ['latest-desc', ''],
      ['price-asc', 'price_asc'],
      ['price-desc', 'price_desc'],
      ['trending-desc', 'popularity'],
    ])
    const { categoryId, search, sort = 'latest-desc' } = input
    const mappedSort = sortMap.get(sort)
    let q = query(collectionsRef)
    switch (mappedSort) {
      case 'price-asc':
        q = query(collectionsRef, orderBy('price.value'))
        break
      case 'price-desc':
        q = query(collectionsRef, orderBy('price.value', 'desc'))
        break
      default:
        query(collectionsRef)
        break
    }
    const querySnapshot = await getDocs(q)
    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      products.push(doc.data() as Product)
    })
    return {
      products,
      found: products.length,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
