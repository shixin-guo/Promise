import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useTheme } from 'next-themes'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { WagmiConfig, createClient, chain } from 'wagmi'

const client = createClient(
  getDefaultClient({
    appName: 'ZNFT',
    chains: [chain.localhost, chain.mainnet, chain.goerli, chain.sepolia],
  })
)
const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  // const { theme } = useTheme()
  const Layout = (Component as any).Layout || Noop
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider mode={'light'}>
        <Head />
        <ManagedUIContext>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </ManagedUIContext>
      </ConnectKitProvider>
    </WagmiConfig>
  )
}
