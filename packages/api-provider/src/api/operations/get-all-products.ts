import { NFT } from '@pearl/commerce/types/product'
import type { ShopifyConfig } from '..'
import getFirstNFTsQuery from '../../utils/queries/get-all-products-query'

export default function getAllProductsOperation({
  commerce,
}: {
  commerce: any
}) {
  async function getAllProducts({
    query = getFirstNFTsQuery,
    variables,
    config,
  }: {
    query?: string
    variables?: { first: number; after?: string; orderBy?: string }
    config?: Partial<ShopifyConfig>
  } = {}): Promise<NFT[]> {
    const { fetch } = commerce.getConfig(config)

    const { data } = await fetch(query, { variables })

    return data.nfts ?? []
  }

  return getAllProducts
}
