import type { Category } from '@pearl/commerce/types/site'
import type { ShopifyConfig } from '../api'
// import type { CollectionEdge } from '../../schema'

// import getSiteCollectionsQuery from './queries/get-all-collections-query'

const getCategories = async ({
  fetch,
  locale,
}: ShopifyConfig): Promise<Category[]> => {
  const { data } = await fetch(
    // getSiteCollectionsQuery,
    '',
    {
      variables: {
        first: 250,
      },
    },
    {
      ...(locale && {
        'Accept-Language': locale,
      }),
    }
  )

  return (
    // data.collections?.edges?.map(({ node }: CollectionEdge) =>
    //   normalizeCategory(node)
    // ) ?? []
    []
  )
}

export default getCategories
