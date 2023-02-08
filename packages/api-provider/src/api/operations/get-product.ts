import type {
  OperationContext,
  OperationOptions,
} from '@pearl/commerce/api/operations'
import { GetProductOperation } from '@pearl/commerce/types/product'
import getFirstNFTsQuery from '../../utils/queries/get-all-products-query'
import type { ShopifyConfig, Provider } from '..'
import { GetAllProductsQuery } from '../../../schema'

export default function getProductOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getProduct<T extends GetProductOperation>({
    query = getFirstNFTsQuery,
    variables,
    config: cfg,
  }: {
    query?: string
    variables: T['variables']
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<any> {
    const { fetch, locale } = commerce.getConfig(cfg)
    const { data } = await fetch<GetAllProductsQuery>(query, {
      variables,
    })
    return data
  }

  return getProduct
}
