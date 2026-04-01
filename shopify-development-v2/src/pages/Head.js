import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Analytics from "analytics";
import googleTagManager from "@analytics/google-tag-manager";
import ReactGA from "react-ga4";
const Head = props => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const ReactPixel = require("react-facebook-pixel").default;
      ReactPixel.init("959643849471654"); // Your Facebook Pixel ID
      ReactPixel.pageView();
    }
  }, []);

  // GA4 Analytics
  ReactGA.initialize("G-L1N5R09FKD");
  ReactGA.send("pageview");

  // Google Tag Manager
  const analytics = Analytics({
    app: "awesome-app",
    plugins: [
      googleTagManager({
        containerId: "GTM-MGVBXJP"
      })
    ]
  });
  analytics.page();

  // Other head property starts
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta charSet="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-57x57.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-60x60.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-72x72.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-76x76.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-114x114.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-120x120.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-144x144.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-152x152.png`}
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${process.env.PUBLIC_URL}/favicons/apple-icon-180x180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${process.env.PUBLIC_URL}/favicons/android-icon-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${process.env.PUBLIC_URL}/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${process.env.PUBLIC_URL}/favicons/favicon-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${process.env.PUBLIC_URL}/favicons/favicon-16x16.png`}
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={`${process.env.PUBLIC_URL}/favicons//ms-icon-144x144.png`}
      />
      <meta name="theme-color" content="#ffffff"></meta>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="description" content={props.description} />
      <meta name="keywords" content={props.keywordslist} />
      <meta name="og:title" content={props.title} />
      <meta name="og:description" content={props.ogdescription} />
      <meta name="og:type" content={props.type} />
      <meta name="og:url" content={props.url} />
      <meta name="og:site_name" content={props.site_name} />
      <link
        rel="shortcut icon"
        href={`${process.env.PUBLIC_URL}/favicons/favicon.ico?v1`}
      />
      <link rel="manifest" href={`${process.env.PUBLIC_URL}/manifest.json`} />
    </Helmet>
  );
};

export default Head;
