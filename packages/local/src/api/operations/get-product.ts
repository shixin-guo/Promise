import type { LocalConfig } from '../index'
import { Product } from '@vercel/commerce/types/product'
import { GetProductOperation } from '@vercel/commerce/types/product'

import type { OperationContext } from '@vercel/commerce/api/operations'
// todo remove into common or provider ?
import admin from '../../firebase/nodeApp'

export type FirebaseCustomerType = {
  name: string
  description: string
  descriptionHtml?: string
  sku?: string
  slug?: string
  path?: string
  price: any
  images: any
  variants: any
  options: any
}
export default function getProductOperation({
  commerce,
}: OperationContext<any>) {
  async function getProduct<T extends GetProductOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<Product | {} | any> {
    const querySnapshot = await admin
      .firestore()
      .collection('collections')
      .doc(variables?.slug || 'empty')
      .get()
    console.log(querySnapshot)
    // todo  add a normalize js
    // todo FirebaseCustomerType is too SB
    const { name, description, price, images, variants, options } =
      querySnapshot.data() as FirebaseCustomerType

    return {
      product: {
        id: variables?.slug,
        slug: variables?.slug,
        description,
        price,
        images,
        name,
        variants,
        options,
      },
    }
  }

  return getProduct
}
