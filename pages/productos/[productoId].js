import { useQuery } from "react-query";
import Head from "next/head";
import { useRouter } from "next/router";

import { getProductById } from "../../queries/products/products.queries";

import Spinner from "../../components/spinner/spinner.component";
import ErrorComponent from "../../components/error/errorDefault.component";
import ItemDetailComponent from "../../components/itemDetail/itemDetail.component.jsx";
import { useEffect } from "react";

const DetalleProducto = ({ pageProps }) => {
  const router = useRouter();
  const sellerId = router.query.id;

  useEffect(() => {
    if (sellerId) {
      localStorage.setItem("sellerId", sellerId);
    }
  }, []);

  const header = (info) => {
    return (
      <Head>
        <title>Dealshop - {info.name}</title>
        <meta name="author" content="Dealshop" />
        <meta name="owner" content="Dealshop" />
        <meta name="title" content={`${info.name} dealshop`} />
        <meta name="description" content={`${info.name} Dealshop`} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://www.dealshop.com.ar/productos/${info.id}`}
        />
        <meta property="og:title" content={info.name} />
        <meta property="og:description" content={info.name} />
        <meta
          property="og:image"
          content={`https://dealshop.com.ar/images${info.photos[0].image}`}
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content={`https://www.dealshop.com.ar/productos/${info.id}`}
        />
        <meta property="twitter:title" content={info.name} />
        <meta property="twitter:description" content={info.name} />
        <meta
          property="twitter:image"
          content={`https://dealshop.com.ar/images${info.photos[0].image}`}
        />
      </Head>
    );
  };

  return (
    <div>
      {header(pageProps.data)}
      <ItemDetailComponent item={pageProps.data} />
    </div>
  );
};

export async function getServerSideProps({ params }) {
  const res = await getProductById(params.productoId);
  return {
    props: {
      data: res,
    },
  };
}

export default DetalleProducto;
