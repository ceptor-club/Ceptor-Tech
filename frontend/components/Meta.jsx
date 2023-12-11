import Head from "next/head";
import Script from "next/script";

const Meta = () => (
  // const Head = ({ title, desc, canonical, image, props }) => (
  <>
    <Head>
      <title>CEPTOR CLUB</title>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:image" content={`${image}`} />
    <meta name="description" content={desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={desc} />
    <meta property="og:site_name" content="Dynamic Crypto Gaming" />
    <meta property="og:url" content={`${canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={desc} />
    <meta name="twitter:site" content="@dynamiccryptog" />
    <meta name="twitter:creator" content="@dynamiccryptog" />
    <link rel="icon" type="image/png" href="/favicon.ico" />
    <link rel="apple-touch-icon" href="/favicon.ico" /> */}
      <link
        href="https://fonts.googleapis.com/css2?family=Milonga&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Nothing+You+Could+Do&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
    </Head>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-37VQF6EBG7"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-37VQF6EBG7');
    `}
    </Script>
  </>
);
export default Meta;
