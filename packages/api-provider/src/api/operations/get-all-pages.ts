import type {
  OperationContext,
  OperationOptions,
} from '@pearl/commerce/api/operations'
// import {
//   GetAllPagesQuery,
//   GetAllPagesQueryVariables,
//   PageEdge,
// } from '../../../schema'
import { normalizePages } from '../../utils'
import type { ShopifyConfig, Provider } from '..'
import type { GetAllPagesOperation, Page } from '@pearl/commerce/types/page'
// import getAllPagesQuery from '../../utils/queries/get-all-pages-query'

export default function getAllPagesOperation({
  commerce,
}: OperationContext<Provider>) {
  async function getAllPages<T extends GetAllPagesOperation>(opts?: {
    config?: Partial<ShopifyConfig>
    preview?: boolean
  }): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>(
    opts: {
      config?: Partial<ShopifyConfig>
      preview?: boolean
    } & OperationOptions
  ): Promise<T['data']>

  async function getAllPages<T extends GetAllPagesOperation>({
    // query = getAllPagesQuery,
    query = '',
    config,
    variables,
  }: {
    url?: string
    config?: Partial<ShopifyConfig>
    // variables?: GetAllPagesQueryVariables
    variables?: any
    preview?: boolean
    query?: string
  } = {}): Promise<T['data']> {
    const {
      fetch,
      locale,
      locales = ['en-US', 'es'],
    } = commerce.getConfig(config)

    // const { data } = await fetch<GetAllPagesQuery, GetAllPagesQueryVariables>(
    //   query,
    //   {
    //     variables,
    //   },
    //   {
    //     ...(locale && {
    //       'Accept-Language': locale,
    //     }),
    //   }
    // )
    const { data } = { data: { pages: { edges: [] } } }

    return {
      pages: locales.reduce<Page[]>(
        (arr, locale) =>
          // arr.concat(normalizePages(data.pages.edges as PageEdge[], locale)),
          arr.concat(normalizePages(data.pages.edges as [], locale)),

        []
      ),
    }
  }

  return getAllPages
}