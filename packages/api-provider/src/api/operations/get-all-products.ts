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
import getFirstNFTsQuery from '../../utils/queries/get-all-products-query'

export default function getAllProductsOperation({
  commerce,
}: {
  commerce: any
}) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = getFirstNFTsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<ShopifyConfig>
  } = {}): Promise<any> {
    const { fetch } = commerce.getConfig(config)

    const { data } = await fetch(query, { variables })

    return {
      products: data.nfts ?? [],
    }
  }

  return getAllProducts
}
