import type {
  OperationContext,
  OperationOptions,
} from '@pearl/commerce/api/operations'
import { GetAllProductPathsOperation } from '@pearl/commerce/types/product'
import {
  GetAllProductPathsQuery,
  GetAllProductPathsQueryVariables,
  ProductEdge,
} from '../../../schema'
import type { ShopifyConfig, Provider } from '..'
import { getFirstNFTsQuery } from '../../utils'

export default function getAllProductPathsOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllProductPaths<
    T extends GetAllProductPathsOperation
  >(opts?: {
    variables?: T['variables']
    config?: ShopifyConfig
  }): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>(
    opts: {
      variables?: T['variables']
      config?: ShopifyConfig
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllProductPaths<T extends GetAllProductPathsOperation>({
    query = getFirstNFTsQuery,
    config,
    variables,
  }: {
    query?: string
    config?: ShopifyConfig
    variables?: T['variables']
  } = {}): Promise<T['data']> {
    config = commerce.getConfig(config)

    const { data } = await config.fetch<
      GetAllProductPathsQuery,
      GetAllProductPathsQueryVariables
    >(query, { variables })

    return {
      products: data.products.edges.map(({ node: { handle } }) => ({
        path: `/${handle}`,
      })),
    }
  }

  return getAllProductPaths
}
