import Head from 'next/head'
import '@/styles/globals.css'

import { Analytics } from '@vercel/analytics/react';

import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }: {Component: any, pageProps: any, session: any }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="viewport-fit=cover width=device-width initial-scale=1" />
        <meta name="description" content="Get information about your teacher for the best grade in your next exam!"/>
        <meta name="keywords" content="know ur teacher, know your teacher, teacher, exam, prepare, know, ur, school, tutoring"/>
        <meta name="author" content="Ilaria Migone"/>
        <meta charSet="UTF-8"/>
        <title>Home | Know ur teacher</title>
        <link rel="icon" type="image/x-icon" href="https://cdn.knowurteacher.com/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="https://cdn.knowurteacher.com/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="https://cdn.knowurteacher.com/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="https://cdn.knowurteacher.com/favicon-16x16.png"/>
        {/*                        CORS has been having some problems, better to leave it "local"*/}
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="https://cdn.knowurteacher.com/safari-pinned-tab.svg" color="#000000"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#000000"/>
        <meta name="google-site-verification" content="KgI7QxovzGjE_f_S2u1LvlUqJSTrmVAuiwFfImkhEXU" />
      </Head>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Analytics />
    </>
  )
}

export default MyApp