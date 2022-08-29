import type { GetStaticPropsContext } from 'next'
import useCustomer from '@framework/customer/use-customer'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Container, Text } from '@components/ui'
import useSearch from '@framework/product/use-search'
import Image from 'next/image'
import zoomSDK from '@zoom/appssdk'
export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories },
  }
}

export default function Profile() {
  const { data: trees } = useSearch({
    search: '',
    isMy: true,
  })
  const openTreejer = () => {
    zoomSDK.openUrl({
      url: 'https://treejer.com/tree/659',
    })
  }
  return (
    <Container className="pt-4">
      <Text variant="pageHeading">My Forest</Text>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-6 sm:px-2 lg:max-w-7xl lg:px-2">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {trees?.products.map((tree: any, index: number) => (
              <div key={tree.name + index} className="group relative">
                <div className="w-full min-h-40 min-w-40 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:w-60 lg:aspect-none">
                  <Image
                    src={`/trees/${index % 8}.png`}
                    alt={'sdds'}
                    width={240}
                    height={240}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full bg-gray-200"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span className="text-lg">{tree.name}</span>
                      {/* <button
                        onClick={openTreejer}
                        className="text-blue-600 hover:text-blue-600"
                      >
                        Check Status in Treejer
                      </button> */}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

Profile.Layout = Layout
