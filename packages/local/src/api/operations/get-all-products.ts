import { Product } from '@vercel/commerce/types/product'
import { GetAllProductsOperation } from '@vercel/commerce/types/product'
import type { OperationContext } from '@vercel/commerce/api/operations'
import type { LocalConfig } from '../index'
import admin from '../../firebase/nodeApp'
// todo remove into common or provider ?

export default function getAllProductsOperation({
  commerce,
}: OperationContext<any>) {
  async function getAllProducts<T extends GetAllProductsOperation>({
    query = '',
    variables,
    config,
  }: {
    query?: string
    variables?: T['variables']
    config?: Partial<LocalConfig>
    preview?: boolean
  } = {}): Promise<{ products: Product[] | any[] }> {
    const db = admin.firestore()
    const querySnapshot = await db.collection('collections').limit(5).get()
    let products: Product[] = []
    // todo  add a normalize js
    querySnapshot.forEach((doc) => {
      // todo defined doc.data() type is Products
      const { name, description, price, images, path, variants, options } =
        doc.data()
      products.push({
        id: doc.id,
        slug: doc.id,
        path: path,
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
    }
  }
  return getAllProducts
}
