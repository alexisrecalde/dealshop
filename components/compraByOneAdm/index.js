import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CartDetailTableComponent from "../table/cartDetailTable/cartDetailTable.component";

import {
  selectIsUserLogged,
  selectUserType,
  selectIsSubSeller,
  selectIsSuperSeller,
  selectUserId,
} from "../../redux/user/user.selector";
import { orderProductsMapper } from "../../components/orderDetail/mapper";

import { CurrencyText } from "../../utils/number.utils";
import { getCommissionPercentage } from "../../utils/general.utils.js";
import "react-toastify/dist/ReactToastify.css";

const CompraByOneAdm = ({
  order,
  compra,
  compraInfo,
  productos,
  userType,
  isSubSeller,
  isSuperSeller,
  userId,
}) => {
  const cliente = true;
  const cartItems = orderProductsMapper(productos, cliente);

  const ChipOrdeer = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  //   const shippingCostPrice =
  //     compra.shippingCost != null ? order.shippingCost.price : 0;
  //   const percentageToReceive = getCommissionPercentage(
  //     userType,
  //     isSubSeller,
  //     isSuperSeller,
  //     userId,
  //     order.sellerId
  //   );
  //   const commission =
  //     (order.clientSellingTotalPrice - order.sellingTotalPrice) *
  //     percentageToReceive;

  //   console.log(commission);

  const switchStatusOrder = (param) => {
    switch (param) {
      case 1:
        return <ChipOrdeer type="Aprobado" />;
      case 2:
        return <ChipOrdeer type="Pendiente" />;
      case 3:
        return <ChipOrdeer type="Error" />;
      case 4:
        return <ChipOrdeer type="Pendiente" />;
      case 6:
        return <ChipOrdeer type="Preparacion" />;
      case 7:
        return <ChipOrdeer type="Camino" />;
      case 8:
        return <ChipOrdeer type="Entregado" />;
    }
  };

  const switchTipoEntrega = (tipoDeEntrega) => {
    switch (tipoDeEntrega) {
      case 1:
        return "Envío a domicilio";
      case 2:
        return "Retiro por sucursal";
      case 3:
        return "Venta por mostrador";
      default:
        return "N/A";
    }
  };

  return (
    <div>
      <PageContainer>
        <h2 style={Styles.title}>Datos del pedido #{compra.id}</h2>
        <ParentContainer>
          <NormalTitle>Datos del cliente</NormalTitle>
          <NormalTitle>Datos de la facturación</NormalTitle>
          <DatosContainer>
            <MobileTitle>Datos del cliente</MobileTitle>
            <p style={Styles.semibold}>
              Nombre:{" "}
              <span style={Styles.light}>
                {compraInfo.client.firstName} {compraInfo.client.lastName}
              </span>
            </p>
            <p style={Styles.semibold}>
              Nro. Documento:{" "}
              <span style={Styles.light}>{compraInfo.client.dni}</span>
            </p>
            <p style={Styles.semibold}>
              Teléfono:{" "}
              <span style={Styles.light}>
                {compraInfo.client.phone ? compraInfo.client.phone : "N/A"}
              </span>
            </p>
            <p style={Styles.semibold}>
              Tipo de entrega:{" "}
              <span style={Styles.light}>
                {switchTipoEntrega(compra.deliveryTypeId)}
              </span>
            </p>
            {compra.deliveryTypeId == 1 && (
              <Fragment>
                <p style={Styles.semibold}>
                  Dirección:{" "}
                  <span style={Styles.light}>
                    {compraInfo.client.address
                      ? `${compraInfo.client.address.street} ${compraInfo.client.address.streetHeigth}`
                      : "No especificada"}
                    {` ${compraInfo.client.address.address} | ${compraInfo.client.address.postalCode} |${compraInfo.client.address.province} `}
                    {/* {compraInfo.client.address
                      ? `| ${compraInfo.address.floor}`
                      : null} */}
                  </span>
                </p>
              </Fragment>
            )}
            {/* {compraInfo.deliveryTypeId == 2 && (
              <p style={Styles.semibold}>
                Sucursal:{" "}
                <span style={Styles.light}>
                  {order.branchId == 1
                    ? "Principal (Casanova)"
                    : order.branchId == 2
                    ? "Secundaria (Ramos Mejía)"
                    : "-"}
                </span>
              </p>
            )} */}
            <p style={Styles.semibold}>
              Fecha de pedido:{" "}
              <span style={Styles.light}>
                {compra.createdAt.substring(0, 10)}
              </span>
            </p>
            {compra.deliveryTypeId == 1 && (
              <p style={Styles.semibold}>
                Fecha de entrega:{" "}
                <span style={Styles.light}>
                  {compra.estimatedDeliveryDate
                    ? compra.estimatedDeliveryDate.substring(0, 10)
                    : "No especificado"}
                </span>
              </p>
            )}
          </DatosContainer>
          <DatosContainer>
            <MobileTitle>Datos de la facturación</MobileTitle>
            {compra.deliveryTypeId == 1 && (
              <p style={Styles.semibold}>
                Cadete:{" "}
                <span style={Styles.light}>
                  {compraInfo.cadet != null
                    ? `${compraInfo.cadet.firstName} ${compraInfo.cadet.lastName}`
                    : "Sin cadete asignado"}
                </span>
              </p>
            )}
            <p style={Styles.semibold}>
              Estado: {switchStatusOrder(compra.clientStatusOrderId)}
            </p>
            <p style={Styles.semibold}>
              Total costo productos:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={compra.total} />
              </span>
            </p>
            {compra.deliveryTypeId == 1 && (
              <p style={Styles.semibold}>
                Costo del envío:{"  "}
                <span style={Styles.light}>
                  <CurrencyText value={compra.shippingPrice} />
                </span>
              </p>
            )}
            <p style={{ ...Styles.bold, marginTop: "10px" }}>
              Total de venta:{" "}
              <CurrencyText
                value={
                  compra.deliveryTypeId == 1
                    ? compra.shippingPrice + compra.total
                    : compra.total
                }
              />
            </p>
            {userType == 3 ? (
              <p style={Styles.bold}>
                Comisión al vendedor:{"  "}
                <CurrencyText value={compra.total * 0.1} />
              </p>
            ) : userType == 5 ? (
              <p style={Styles.bold}>
                Comisión al repartidor:{"  "}
                <CurrencyText value={compra.shippingPrice} />
              </p>
            ) : userType == 1 || userType == 2 ? (
              <>
                <p style={Styles.bold}>
                  Comisión al vendedor:{"  "}
                  <CurrencyText value={compra.total * 0.1} />
                </p>
                <p style={Styles.bold}>
                  Comisión al repartidor:{"  "}
                  <CurrencyText value={compra.shippingPrice} />
                </p>
              </>
            ) : null}
            {/* <p style={Styles.bold}>
              Comisión al repartidor:{"  "}
              <CurrencyText value={compra.shippingPrice} />
            </p> */}
          </DatosContainer>
        </ParentContainer>
        <h3 style={{ color: "#00bcd4", fontSize: "1.2rem" }}>
          Productos de la orden
        </h3>
        <CartDetailTableComponent items={cartItems} cliente={cliente} />
      </PageContainer>
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

CompraByOneAdm.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  userType: PropTypes.number.isRequired,
  isSubSeller: PropTypes.bool.isRequired,
  isSuperSeller: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
  isSubSeller: selectIsSubSeller,
  isSuperSeller: selectIsSuperSeller,
  userId: selectUserId,
});

export default connect(mapStateToProps, null)(CompraByOneAdm);
