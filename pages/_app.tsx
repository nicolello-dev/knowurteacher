import Head from 'next/head'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover width=device-width" />
        <meta name="description" content="Get information about your teacher for the best grade in your next exam!"/>
        <meta name="keywords" content="teacher, exam, prepare"/>
        <meta name="author" content="Ilaria Migone"/>
        <meta charSet="UTF-8"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp