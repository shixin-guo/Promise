import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { firebaseDb } from '../firebase/clientApp'
import { Product } from '@vercel/commerce/types/product'
import { useAccount } from 'wagmi'
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
    const {
      categoryId,
      search,
      sort = 'latest-desc',
      isMy = false,
      address,
    } = input
    const mappedSort = sortMap.get(sort)
    let queryConstraints = []

    if (isMy && address) {
      queryConstraints.push(where('arthur', '==', address))
    }
    switch (mappedSort) {
      case 'price_asc':
        queryConstraints.push(orderBy('price.value'))
        break
      case 'price_desc':
        queryConstraints.push(orderBy('price.value', 'desc'))
        break
      default:
        break
    }
    const q = query(collectionsRef, ...queryConstraints)

    const querySnapshot = await getDocs(q)
    const products: Product[] = []
    querySnapshot.forEach((doc) => {
      // todo  add a normalize js
      // todo defined doc.data() type is Products
      const { name, description, price, images, path, variants, options } =
        doc.data()
      products.push({
        id: doc.id,
        slug: doc.id,
        path: doc.id,
        description,
        price,
        images,
        name,
        variants,
        options,
      })
    })
    return {
      products,
      found: products.length,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
      const { address } = useAccount()
      return useData({
        input: [
          ['search', input.search],
          ['categoryId', input.categoryId],
          ['brandId', input.brandId],
          ['sort', input.sort],
          ['isMy', input.isMy],
          ['address', address],
        ],

        swrOptions: {
          revalidateOnFocus: false,
          ...input.swrOptions,
        },
      })
    },
}
