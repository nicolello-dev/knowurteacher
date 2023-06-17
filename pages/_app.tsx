import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css' // Bootstrap
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover width=device-width initial-scale=1" />
        <meta name="description" content="Get information about your teacher for the best grade in your next exam!"/>
        <meta name="keywords" content="know ur teacher, teacher, exam, prepare, know, ur"/>
        <meta name="author" content="Ilaria Migone"/>
        <meta charSet="UTF-8"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp