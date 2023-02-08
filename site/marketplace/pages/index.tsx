import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Hero } from '@components/ui'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { createZoomConfig } from '@lib/zoom'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const { products } = await commerce.getAllProducts({
    variables: { first: 6 },
    config,
    preview,
  })
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  createZoomConfig()
  return (
    <>
      <Grid variant="filled">
        {products.slice(3, 7).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 540 : 270,
              height: i === 0 ? 303 : 152,
              priority: true,
            }}
          />
        ))}
      </Grid>
      <Hero
        headline="Capturing memorable moments during your Zoom meeting"
        description=" A Zoom App to capture these screenshots capture should be useful. It can even turn them into NFTs for sharing and be engraved on the blockchain. It would also support applying NFT assets (image, video) as virtual background."
      />
      <Grid layout="B" variant="filled">
        {products.slice(0, 3).map((product: any, i: number) => (
          <ProductCard
            key={product.id}
            product={product}
            imgProps={{
              width: i === 0 ? 540 : 270,
              height: i === 0 ? 303 : 152,
            }}
          />
        ))}
      </Grid>
    </>
  )
}

Home.Layout = Layout
