import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { getHomeProducts } from "../queries/products/products.queries";
import CarouselComponent from "../components/carousel/carousel.component";
import Categorias from "../components/categorias";
import SeccionInteres from "../components/seccionInteres";
import Promo from "../components/promo";
import MenuShipping from "../components/menuShipping";
import Destacados from "../components/destacados";
import Link from "next/link";
import FormasPagos from "../components/formasPagos";
import { getCity } from "../queries/users/users.queries";

const HomePage = () => {
  const [mobileView, setMobileView] = useState(false);
  const { isLoading, data } = useQuery("homeProducts", getHomeProducts);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const header = () => {
    return (
      <Head>
        <title>
          Dealshop Argentina - Vende y compra productos al mejor precio
        </title>
        <meta name="author" content="Dealshop" />
        <meta
          name="description"
          content="Vende y compra productos con Envío Gratis en el día en Dealshop Argentina. Encontra miles de productos del hogar, griferias, sanitarios, electrodomesticos, muebles, etc, al mejor precio."
          key="title"
        />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <div>
      {header()}
      <div style={{ marginBottom: "3%" }}>
        <CarouselComponent />
        <FormasPagos />
        <Main>
          <ContainerDestacados>
            <h2 className="destacados-title">#Ofertas destacadas!</h2>
            <Destacados products={data} isLoading={isLoading} min={0} max={8} />
          </ContainerDestacados>
          <ContainerDestacados>
            <h2 className="destacados-title">#Novedades de la semana!</h2>
            <Destacados
              products={data}
              isLoading={isLoading}
              min={8}
              max={16}
            />
          </ContainerDestacados>
          <ContainerCategories>
            {mobileView ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingRight: "10px",
                }}
              >
                <h2 className="destacados-title">Categorias</h2>
                <Link href="/productos">
                  <a href="" style={{ fontSize: "13px", color: "#33A0FF" }}>
                    Ver todo
                  </a>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="destacados-title">Categorias</h2>
              </>
            )}
            <Categorias></Categorias>
          </ContainerCategories>
          <ContainerDestacados>
            <h2 className="destacados-title">Destacados de la semana!</h2>
            <Destacados
              products={data}
              isLoading={isLoading}
              min={16}
              max={24}
            />
          </ContainerDestacados>
          <Container>
            <h2 className="destacados-title">Te puede interesar</h2>
            <SeccionInteres />
          </Container>
          <Promo />
          <Container>
            <MenuShipping />
          </Container>
        </Main>
      </div>
      <ToastContainer />
    </div>
  );
};

const Main = styled.div`
  margin: 0 auto;
  padding: 0 100px;
  @media screen and (max-width: 900px) {
    padding: 10px 10px 10px 10px;
  }
`;

const Container = styled.div`
  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

const ContainerCategories = styled.div`
  padding-top: 30px;
  @media screen and (max-width: 900px) {
    padding: 0;
  }
`;

const ContainerDestacados = styled.div`
  background: white;
  padding: 10px;
  margin-top: 20px;
  background-color: #fff;
  border: 1px solid #dadada;
  @media screen and (max-width: 900px) {
    padding: 0 5px;
    margin: 20px 10px
  }
`;

const Title = styled.h2`
  color: #e91e63;
`;

export default HomePage;
