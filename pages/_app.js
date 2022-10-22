import React from "react";
import Head from "next/head";
import App from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import withRedux from "next-redux-wrapper";
import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { ReactQueryDevtools } from "react-query/devtools";

import { store, persistor } from "../redux/store";

import "../public/styles/globals.css";
import Layout from "../components/layout/layout";
import "../sass/main.scss";
import "glider-js/glider.min.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 100000,
      // cacheTime: 50000
    },
  },
});

class MyApp extends App {
  render() {
    const { Component, appProps, pageProps } = this.props;

    return (
      <>
        <Head>
          <meta name="author" content="Dealshop" />
          <meta name="description" content="Vende y compra productos con Envío Gratis en el día en Dealshop Argentina. Encontra miles de productos del hogar, griferias, sanitarios, electrodomesticos, muebles, etc, al mejor precio." key="title" />
          <meta name="owner" content="Dealshop" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-TLVZ39PYMC"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TLVZ39PYMC');
          `,
            }}
          />
          {pageProps.data && (
            <>
              {" "}
              <meta name="title" content={`${pageProps.data.name} dealshop`} />
              <meta name="description" content={pageProps.data.name} />
              <meta property="og:type" content="website" />
              <meta
                property="og:url"
                content={`https://www.dealshop.com.ar/productos/${pageProps.data.id}`}
              />
              <meta property="og:title" content={pageProps.data.name} />
              <meta property="og:description" content={pageProps.data.name} />
              <meta
                property="og:image"
                content={`https://dealshop.com.ar/images${pageProps.data.photos[0].image}`}
              />
              <meta property="twitter:card" content="summary_large_image" />
              <meta
                property="twitter:url"
                content={`https://www.dealshop.com.ar/productos/${pageProps.data.id}`}
              />
              <meta property="twitter:title" content={pageProps.data.name} />
              <meta
                property="twitter:description"
                content={pageProps.data.name}
              />
              <meta
                property="twitter:image"
                content={`https://dealshop.com.ar/images${pageProps.data.photos[0].image}`}
              />
            </>
          )}
        </Head>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                {/* <ReactQueryDevtools /> */}
                <Component
                  {...appProps}
                  style={{ height: "100%" }}
                  {...this.props}
                />
              </Layout>
            </QueryClientProvider>
          </PersistGate>
        </Provider>
      </>
    );
  }
}

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
