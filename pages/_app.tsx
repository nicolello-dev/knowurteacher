import Head from 'next/head'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp