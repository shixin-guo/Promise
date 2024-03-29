import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import Image from 'next/image'

import type { Product } from '@commerce/types/product'
import { Button, Text, Rating, Input, Collapse, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import { useAccount } from 'wagmi'
import Link from 'next/link'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})
  const { address } = useAccount()
  const isOwner = address === product.arthur
  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])
  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }
  const [wording, setWording] = useState('Gift your friend this NFT')
  const sendAsGift = async () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setWording('Completed')
    }, 3000)
  }
  return (
    <div className={className}>
      {/* <ProductOptions
        options={product.options}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      /> */}
      {/* <Text
        className="pb-4 break-words w-full max-w-xl text-lg"
        html={product.name}
      /> */}
      <Text
        className="pb-4 break-words w-full max-w-xl"
        html={product.descriptionHtml || product.description}
      />
      {/* <div className="flex flex-row justify-between items-center">
        <Rating value={4} />
        <div className="text-accent-6 pr-1 font-medium text-sm">36 reviews</div>
      </div> */}
      <div>
        {process.env.COMMERCE_CART_ENABLED &&
          (isOwner ? (
            <>
              <label className="text-base font-semibold my-1">
                Your Friend Email:
              </label>
              <Input
                className="w-full border-2 border-gray-300 rounded-lg p-2 pb-2 mb-3"
                placeholder="Provide Your Friend Email"
              />
              <Button
                aria-label="Add to Cart"
                type="button"
                className={s.button}
                onClick={sendAsGift}
                loading={loading}
                disabled={variant?.availableForSale === false}
              >
                {wording}
              </Button>
            </>
          ) : (
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={variant?.availableForSale === false}
            >
              {variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          ))}
      </div>
      <div className="mt-6">
        <Collapse title="Donate to charity">
          25% of the profits are donated to charity. Transactions can be
          utilized for ESG (Environment, Social responsibility, Corporate
          Governance)
        </Collapse>
        <Collapse title="Plant a real tree in the world">
          Treejer is creating a blockchain-based and gamified ecosystem in which
          individuals and businesses are given incentives to contribute to
          community-based reforestation projects. This allows them to gain
          measurable and tangible financial and non-financial returns.
          <Image width={71} height={71} src={'/treejer.png'} alt={'treejer'} />
          <br />
          <Link href={'https://treejer.com/'} className="">
            Learn About Treejer
          </Link>
        </Collapse>
      </div>
    </div>
  )
}

export default ProductSidebar
