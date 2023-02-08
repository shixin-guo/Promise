import type {
  OperationContext,
  OperationOptions,
} from '@pearl/commerce/api/operations'
import { GetAllProductsOperation } from '@pearl/commerce/types/product'
import {
  GetAllProductsQuery,
  GetAllProductsQueryVariables,
  Nft,
} from '../../../schema'
import type { ShopifyConfig, Provider } from '..'
import getAllProductsQuery from '../../utils/queries/get-all-products-query'

export default function getAllProductsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getAllProductsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  } = {}): Promise<T['data']> {
    const { fetch, locale } = commerce.getConfig(config)

    const { data } = await fetch<
      GetAllProductsQuery,
      GetAllProductsQueryVariables
    >(
      query,
      { variables },
      {
        ...(locale && {
          'Accept-Language': locale,
        }),
      }
    )

    return {
      products: data.nfts ?? [],
    }
  }

  return getAllProducts
}
