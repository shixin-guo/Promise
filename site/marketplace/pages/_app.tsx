import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { useTheme } from 'next-themes'
import { ConnectKitProvider } from 'connectkit'
import {
  WagmiConfig,
  createClient,
  allChains,
  configureChains,
  chain,
} from 'wagmi'

import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import { firebaseApp } from '@framework/provider'

const { chains, provider, webSocketProvider } = configureChains(allChains, [
  publicProvider(),
])
const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new InjectedConnector({ chains: [chain.hardhat] }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})
const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  useEffect(() => {
    // Pass your reCAPTCHA v3 site key (public key) to activate(). Make sure this
    // key is the counterpart to the secret key you set in the Firebase console.

    // todo private key hidden
    initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(
        '6LfxOtwgAAAAANbZFszWuXI0D_Lfjx2CjH8xOH8i'
      ),

      // Optional argument. If true, the SDK automatically refreshes App Check
      // tokens as needed.
      isTokenAutoRefreshEnabled: true,
    })
    document.body.classList?.remove('loading')
  }, [])

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
