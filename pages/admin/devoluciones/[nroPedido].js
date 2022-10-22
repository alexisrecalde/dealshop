import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { styled } from "@mui/material/styles";
import getConfig from "next/config";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";

import withAuth, { roles } from "../../../utils/auth.utils";
import { selectUserToken } from "../../../redux/user/user.selector";
import { getOrders } from "../../../queries/orders/orders.queries";

import Spinner from "../../../components/spinner/spinner.component";
import ErrorComponent from "../../../components/error/errorDefault.component";
import ErrorComponentNotFound from "../../../components/error/errorPageNotFound.component";
import { CurrencyText } from "../../../utils/number.utils";
import RefundTableComponent from "../../../components/dataGrid/refundTable/refundTable.component";

const RevisionDevolucion = ({ authToken }) => {
  const router = useRouter();
  const { query } = router;
  const { nroPedido } = router.query;
  const { publicRuntimeConfig } = getConfig();

  const [open, setOpen] = useState(false);

  const getOrdersDevolucionesId = async () => {
    const config = {
      headers: {
        "content-type": "application/json",
        "x-auth-token": `${authToken}`,
        "x-client-id": " 6eb59dd2-7a48-4a13-9110-b78c56a3f861",
        Authorization: `Bearer ${authToken}`,
      },
    };
    const url = `${publicRuntimeConfig.backend_url}/orders/${nroPedido}`;
    const { data } = await axios.get(url, config);
    return data;
  };

  // useEffect(() => {
  //     location.reload();
  // }, [])

  const { isLoading, data, isError } = useQuery(
    ["orders", query],
    getOrdersDevolucionesId
    // {
    //   refetchOnMount: true,
    //   refetchOnReconnect: true,
    //   staleTime: 9000,
    // }
  );

  //   const { isLoading, isError, data } = useQuery(
  //     ["orders", { authToken, id: nroPedido }],
  //     getOrders
  //   );

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Devolución Pedido {nroPedido}</title>
        <meta name="author" content="Dealshop" />
        <meta
          name="description"
          content="Devoluciones del pedido"
          key="title"
        />
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
    <div>
      {header()}
      <PageContainer>
        <h2 style={Styles.title}>Datos del pedido #{data.id}</h2>
        <ParentContainer>
          <NormalTitle>Datos del cliente</NormalTitle>
          <NormalTitle>Datos de la facturación</NormalTitle>
          <DatosContainer>
            <MobileTitle>Datos del cliente</MobileTitle>
            <p style={Styles.semibold}>
              Nombre: <span style={Styles.light}>{data.clientName}</span>
            </p>
            <p style={Styles.semibold}>
              Tipo de entrega:{" "}
              <span style={Styles.light}>{data.deliveryType.description}</span>
            </p>
            <p style={Styles.semibold}>
              Fecha de entrega:{" "}
              <span style={Styles.light}>
                {data.deliveryDate.substr(0, 10)}
              </span>
            </p>
            <p style={Styles.semibold}>
              Notas:{" "}
              <span style={Styles.light}>
                {data.additionalInfo == null ? "N/A" : data.additionalInfo}
              </span>
            </p>
          </DatosContainer>
          <DatosContainer>
            <MobileTitle>Datos de la facturación</MobileTitle>
              <p style={Styles.semibold}>
                Vendedor:{" "}
                <span style={Styles.light}>
                  {data.sellerId
                    ? `${data.seller.firstName} ${data.seller.lastName}`
                    : "N/A"}
                </span>
              </p>
              <p style={Styles.semibold}>
                Cadete:{" "}
                <span style={Styles.light}>
                  {data.cadetId != null
                    ? `${data.cadet.firstName} ${data.cadet.lastName}`
                    : "Sin cadete asignado"}
                </span>
              </p>
            <p style={Styles.semibold}>
              Total costo productos:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={data.sellingTotalPrice} />
              </span>
            </p>
            <p style={Styles.semibold}>
              Subtotal venta:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={data.clientSellingTotalPrice} />
              </span>
            </p>
            <p style={Styles.semibold}>
              {data.shippingCost ? (
                <>
                  {" "}
                  Costo del envío:{"  "}
                  <span style={Styles.light}>
                    <CurrencyText value={data.shippingCost.price} />
                  </span>
                </>
              ) : null}
            </p>
            <p style={Styles.bold}>
              Total de la venta:{"  "}
              {data.shippingCost ? (
                <>
                  <CurrencyText
                    value={
                      data.clientSellingTotalPrice + data.shippingCost.price
                    }
                  />
                </>
              ) : (
                <CurrencyText value={data.clientSellingTotalPrice} />
              )}
            </p>
            <p style={Styles.bold}>
              Comisión:{"  "}
              <CurrencyText
                value={data.clientSellingTotalPrice - data.sellingTotalPrice}
              />
            </p>
          </DatosContainer>
        </ParentContainer>
        <h3 style={{ color: "#00bcd4", fontSize: "1.2rem" }}>
          Seleccione los productos a devolver
        </h3>
        <RefundTableComponent
          authToken={authToken}
          orderId={nroPedido}
          statusId={data.statusId}
          items={data.products}
          setOpen={setOpen}
        />
      </PageContainer>
      <Backdrop open={open} style={{ zIndex: "3000" }}>
        <Spinner />
      </Backdrop>
    </div>
  );
};

const Styles = {
  title: {
    color: "#e91e63",
  },
  fullSize: {
    width: "100%",
    height: "100%",
  },
  light: {
    fontWeight: "400",
    fontSize: "1.1rem",
  },
  semibold: {
    fontWeight: "600",
    fontSize: "1.1rem",
  },
  bold: {
    fontWeight: "800",
    fontSize: "1.3rem",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: "20px 0px",
  },
  buttons: {
    fontSize: "1rem",
    padding: "10px",
    marginLeft: "10px",
  },
};

const PageContainer = styled.div`
  padding: 20px;
`;

const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 0.2fr 1fr;
  grid-gap: 10px;
  @media screen and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const DatosContainer = styled.div`
  width: 100%;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  padding: 10px;
  background-color: #ffffff;
`;

const NormalTitle = styled.h3`
  color: #00bcd4;
  font-size: 1.2rem;
  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const MobileTitle = styled.h3`
  color: #00bcd4;
  font-size: 1.3rem;
  display: none;
  @media screen and (max-width: 900px) {
    display: inherit;
  }
`;

RevisionDevolucion.propTypes = {
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authToken: selectUserToken,
});

export default withAuth(connect(mapStateToProps, null)(RevisionDevolucion), [
  roles.SUPER_ADMIN,
  roles.ADMIN,
]);
