import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <title>wordle</title>
      <link rel="icon" href="/icon.svg" />
      <script async src="https://cdn.splitbee.io/sb.js" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/icon.svg" />
      <link rel="apple-touch-icon" href="/icon.png" />
      <meta name="theme-color" content='var(--bg)' />
    </Head>
    <Component {...pageProps} />
  </>
}

export default MyApp
