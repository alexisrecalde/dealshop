import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Head from "next/head";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

import { getProducts } from "../../queries/products/products.queries";

import Spinner from "../../components/spinner/spinner.component";
import ErrorComponent from "../../components/error/errorDefault.component";
import ItemsFilterComponent from "../../components/filters/itemsFilter/itemsFilter.component";
import ItemListComponent from "../../components/itemList/itemList.component";
import ItemListBySearch from "../../components/itemListBySearch";

const SearchPage = () => {
  const router = useRouter();
  const {
    name,
    orderBySuggestedPrice,
    fromPrice,
    toPrice,
    colors,
    brands,
    category,
    subCategory
  } = router.query;

  const [openDrawerFilter, setOpenDrawerFilter] = useState(false);
  const [products, setProducts] = useState([]);

  const { isLoading, isError, data } = useQuery(
    [
      "products",
      {
        name,
        orderBySuggestedPrice,
        fromPrice,
        toPrice,
        colors,
        brands,
        category,
        subCategory
      },
    ],
    getProducts
  );

  useEffect(() => {
    const filterOption = () => {
      if (!isLoading) {
        if (name) {
          const resul = data.products.results.filter((item) => {
            return item.name.toLowerCase().search(name.toLowerCase()) != -1;
          });
          setProducts(resul);
        } else {
          setProducts(data.products.results);
        }
      }
    };
    filterOption();
  }, [data]);

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Productos</title>
        <meta name="author" content="Dealshop" />
        <meta name="description" content="Busqueda de productos" key="title" />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  if (isLoading) {
    return (
      <div>
        {header()}
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "20px" }}>
        {header()}
        <ErrorComponent />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "50vh" }}>
      {header()}
      <PageContainer>
        {name ? (
          data.products.results.length > 0 ? null : (
            <h2>No se encontraron resultados para "{name}":</h2>
          )
        ) : (
          ""
        )}
        {data.products.results.length > 0 && (
          <ResultsContainer>
            {data.filters.brands.length > 0 &&
              data.filters.colors.length > 0 && (
                <ItemsFilterComponent
                  brands={data.filters.brands}
                  colors={data.filters.colors}
                  setOpenDrawerFilter={setOpenDrawerFilter}
                  openDrawerFilter={openDrawerFilter}
                />
              )}
            <ItemListBySearch
              products={products}
              setOpenDrawerFilter={setOpenDrawerFilter}
              openDrawerFilter={openDrawerFilter}
            />
          </ResultsContainer>
        )}
      </PageContainer>
      <ToastContainer />
    </div>
  );
};

const PageContainer = styled.div`
  padding: 20px;
  padding-left: 55px;
  padding-right: 20px;
  padding-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 20px;

  @media screen and (max-width: 900px) {
    padding: 0px;

    & h2 {
      font-size: 1.2rem;
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }
`;

const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  z-index: 10;

  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 20px;

    & main {
      width: 100%;
    }
  }
`;

export default SearchPage;
