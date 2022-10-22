import { Fragment } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import CartDetailTableComponent from "../table/cartDetailTable/cartDetailTable.component";
import {switchStatusOrder, switchTipoEntrega} from '../orderStatusChip';
import {
  selectIsUserLogged,
  selectUserType,
  selectIsSubSeller,
  selectIsSuperSeller,
  selectUserId,
} from "../../redux/user/user.selector";
import { orderProductsMapper } from "./mapper";

import { CurrencyText } from "../../utils/number.utils";
import { getCommissionPercentage } from "../../utils/general.utils.js";
import "react-toastify/dist/ReactToastify.css";

const OrderDetailComponent = ({
  order,
  userType,
  isSubSeller,
  isSuperSeller,
  userId,
}) => {
  const cartItems = orderProductsMapper(order.products);
  const shippingCostPrice =
    order.shippingCost != null ? order.shippingCost.price : 0;
  const percentageToReceive = getCommissionPercentage(
    userType,
    isSubSeller,
    isSuperSeller,
    userId,
    order.sellerId
  );
  const commission =
    (order.clientSellingTotalPrice - order.sellingTotalPrice) *
    percentageToReceive;

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
        <h2 style={Styles.title}>Datos del pedido #{order.id}</h2>
        <ParentContainer>
          <NormalTitle>Datos del cliente</NormalTitle>
          <NormalTitle>Datos de la facturación</NormalTitle>
          <DatosContainer>
            <MobileTitle>Datos del cliente</MobileTitle>
            <p style={Styles.semibold}>
              Nombre: <span style={Styles.light}>{order.clientName}</span>
            </p>
            {order.deliveryTypeId == 1 && (
              <Fragment>
                <p style={Styles.semibold}>
                  Dirección:{" "}
                  <span style={Styles.light}>
                    {order.clientAddress
                      ? `${order.clientAddress.street} ${order.clientAddress.streetNumber}`
                      : "No especificada"}
                    {order.clientAddress.apartment
                      ? ` | ${order.clientAddress.apartment} `
                      : null}
                    {order.clientAddress.floor
                      ? `| ${order.clientAddress.floor}`
                      : null}
                  </span>
                </p>
                <p style={Styles.semibold}>
                  Teléfono:{" "}
                  <span style={Styles.light}>
                    {order.clientPhone ? order.clientPhone : "N/A"}
                  </span>
                </p>
              </Fragment>
            )}
            <p style={Styles.semibold}>
              Nro. Documento:{" "}
              <span style={Styles.light}>{order.clientDocument}</span>
            </p>
            <p style={Styles.semibold}>
              Tipo de entrega:{" "}
              <span style={Styles.light}>
                {switchTipoEntrega(order.deliveryTypeId)}
              </span>
            </p>
            {order.deliveryTypeId == 2 && (
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
            )}
            <p style={Styles.semibold}>
              Fecha de pedido:{" "}
              <span style={Styles.light}>
                {order.orderDate.substring(0, 10)}
              </span>
            </p>
            <p style={Styles.semibold}>
              Fecha de entrega:{" "}
              <span style={Styles.light}>
                {order.estimatedDeliveryDate.substring(0, 10)}
              </span>
            </p>
            <p style={Styles.semibold}>
              Notas: <span style={Styles.light}>{order.additionalInfo}</span>
            </p>
          </DatosContainer>
          <DatosContainer>
            <MobileTitle>Datos de la facturación</MobileTitle>
            <p style={Styles.semibold}>
              Vendedor:{" "}
              <span style={Styles.light}>
                {order.seller
                  ? `${order.seller.firstName} ${order.seller.lastName}`
                  : "N/A"}
              </span>
            </p>
            <p style={Styles.semibold}>
              Cadete:{" "}
              <span style={Styles.light}>
                {order.cadet != null
                  ? `${order.cadet.firstName} ${order.cadet.lastName}`
                  : "Sin cadete asignado"}
              </span>
            </p>
            <p style={Styles.semibold}>
              Estado:{" "}
              <span style={Styles.light}>
                {switchStatusOrder(order.status.id)}
              </span>
            </p>
            <p style={Styles.semibold}>
              Total costo productos:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={order.sellingTotalPrice} />
              </span>
            </p>
            <p style={Styles.semibold}>
              Subtotal venta:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={order.clientSellingTotalPrice} />
              </span>
            </p>
            <p style={Styles.semibold}>
              Costo del envío:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={shippingCostPrice} />
              </span>
            </p>
            <p style={{ ...Styles.bold, marginTop: "40px" }}>
              {userType == 5 ? `Total a cobrar:  ` : `Total de la venta:  `}
              <CurrencyText
                value={order.clientSellingTotalPrice + shippingCostPrice}
              />
            </p>
            {userType != 5 && (
              <p style={Styles.bold}>
                Comisión:{"  "}
                <CurrencyText value={commission} />
              </p>
            )}
          </DatosContainer>
        </ParentContainer>
        <h3 style={{ color: "#00bcd4", fontSize: "1.2rem" }}>
          Productos de la orden
        </h3>
        <CartDetailTableComponent items={cartItems} />
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

OrderDetailComponent.propTypes = {
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

export default connect(mapStateToProps, null)(OrderDetailComponent);
