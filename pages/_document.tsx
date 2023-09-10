import { randomBytes } from "crypto";

import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  const nonce = randomBytes(128).toString("base64");
  const prod = process.env.NODE_ENV === "production";
  const csp = `object-src 'none'; base-uri 'none'; script-src 'self' ${
    prod ? "" : "'unsafe-eval'"
  } 'unsafe-inline' https: http: 'nonce-${nonce}' 'strict-dynamic'`;

  return (
    <Html lang="en">
      <Head nonce={nonce}>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <Script
          nonce={nonce}
          src="https://www.googletagmanager.com/gtag/js?id=G-MRPKR5CZEP"
        />
        <Script nonce={nonce} id="google-analytics">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-MRPKR5CZE');
            `}
        </Script>
      </Head>
      <body className="bg-bg dark:bg-[#130316] dark:text-white">
        <Main />
        <NextScript nonce={nonce} />
      </body>
    </Html>
  );
}
