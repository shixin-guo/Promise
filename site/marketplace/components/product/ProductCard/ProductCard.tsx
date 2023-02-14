import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { NFT } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import { ZoomVirtualBackgroundBtn } from '@components/common/VirtualBackground'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: NFT
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price,
    baseAmount: product.price,
    currencyCode: 'ETH',
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.id}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.name}</span>
            </div>
            <ZoomVirtualBackgroundBtn url={product?.fileUrl} />
            {product?.fileUrl && (
              <div>
                <Image
                  quality="85"
                  src={product.fileUrl || placeholderImg}
                  alt={product.name || 'Product Image'}
                  height={(320 * 1080) / 1920}
                  width={320}
                  layout="fixed"
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {/* <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              /> */}
            <ZoomVirtualBackgroundBtn url={product?.fileUrl} />
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>
                  <span>{product.name}</span>
                </h3>
                <div className={s.price}>{`${price} ETH`}</div>
              </div>
            )}
            <div className={s.imageContainer}>
              {product?.fileUrl && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.fileUrl || placeholderImg}
                    height={(540 * 1080) / 1920}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            {/* <WishlistButton
              className={s.wishlistButton}
              productId={product.id}
              variant={product.variants[0] as any}
            /> */}
            <ProductTag name={product.name} price={`${price} ${'ETH'}`} />
            <ZoomVirtualBackgroundBtn url={product?.fileUrl} />
            <div className={s.imageContainer}>
              {product?.fileUrl && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.fileUrl || placeholderImg}
                    height={(540 * 1080) / 1920}
                    width={540}
                    quality="85"
                    layout="responsive"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
