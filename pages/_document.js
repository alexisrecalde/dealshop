import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export default class CustomDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }
    return renderPage();
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge"></meta>
          <meta
            name="description"
            content="Vende y compra productos con Envío Gratis en el día en Dealshop Argentina. Encontra miles de productos del hogar, griferias, sanitarios, electrodomesticos, muebles, etc, al mejor precio."
            key="title"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
          />
          <link
            rel="stylesheet"
            href="//use.fontawesome.com/releases/v5.0.7/css/all.css"
          />
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"
            integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr"
            crossorigin="anonymous"
          />
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
            crossOrigin="anonymous"
          />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <link rel="canonical" href="https://www.dealshop.com.ar/" />
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${publicRuntimeConfig.google_key}&libraries=places`}
            //&callback=initMap
          ></script>
        </Head>
        <body>
          <Main />
        </body>
        <NextScript />
      </Html>
    );
  }
}
