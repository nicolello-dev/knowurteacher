import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.css' // Bootstrap
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: {Component: any, pageProps: any}) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover width=device-width initial-scale=1" />
        <meta name="description" content="Get information about your teacher for the best grade in your next exam!"/>
        <meta name="keywords" content="know ur teacher, teacher, exam, prepare, know, ur, school, tutoring"/>
        <meta name="author" content="Ilaria Migone"/>
        <meta charSet="UTF-8"/>
        <title>Know ur teacher | Home</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp