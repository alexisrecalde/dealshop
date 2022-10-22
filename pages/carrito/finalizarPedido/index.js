import { useState, useEffect, Fragment } from "react";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { useRouter } from "next/router";
import styled from "styled-components";
import Swal from "sweetalert2";
import ReactDOMServer from "react-dom/server";
import Backdrop from "@mui/material/Backdrop";
import {
  selectCartItems,
  selectCartItemsCommission,
  selectCartItemsCost,
  selectCartItemsTotal,
} from "../../../redux/cart/cart.selector";

import Spinner from "../../../components/spinner/spinner.component";
import { CurrencyText } from "../../../utils/number.utils";
import CartDetailTableComponent from "../../../components/table/cartDetailTable/cartDetailTable.component";
import OutOfStockTableComponent from "../../../components/table/outOfStockTable/outOfStockTable.component";
import CustomButtonComponent from "../../../components/customButton/customButton.component";
import {
  selectClientData,
  selectIsconfirmed,
} from "../../../redux/shopData/shopData.selector";
import {
  clearClientInfo,
  setUnconfirmOrder,
} from "../../../redux/shopData/shopData.actions";
import {
  clearAllItemsFromCart,
  clearNoStockItems,
} from "../../../redux/cart/cart.actions";
import {
  selectUserId,
  selectUserToken,
  selectIsSubSeller,
} from "../../../redux/user/user.selector";
import {
  patchOrderTodelivered,
  postOrder,
} from "../../../queries/cart/cart.queries";

import CartStepperComponent from "../../../components/cartStepper/cartStepper.component";

const FinalizarPedido = ({
  cartItems,
  cost,
  total,
  commission,
  shopData,
  isConfirmed,
  clearClientInfo,
  clearAllItemsFromCart,
  clearNoStockItems,
  setUnconfirmOrder,
  userId,
  authToken,
  subVendedor,
}) => {
  const router = useRouter();
  const [getIsLoading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    setIsloading(true);

    isConfirmed
      ? setIsloading(false)
      : router.push("/carrito").then(() => window.scrollTo(0, 0));
  }, []);

  // useEffect(() => {
  //   popConfetti();
  //   setTimeout(popConfetti, 350);
  //   setTimeout(popConfetti, 800);
  //   setTimeout(popConfetti, 1300);
  // }, []);

  // const popConfetti = () => {
  //   jsConfetti.addConfetti({
  //     confettiNumber: 500,
  //     confettiRadius: 5,
  //     confettiColors: ["#E91E63", "#006C84", "#CCD6D1", "#ECA1BB", "#F6EBEB"],
  //   });
  //   jsConfetti.addConfetti({
  //     emojis: ["D", "💥"],
  //     emojiSize: 48,
  //     confettiNumber: 40,
  //   });
  // };

  const editCart = () => {
    Swal.fire({
      titleText: "¿Deseas editar el carrito?",
      text: "Al volver al carrito los datos del cliente se perderán y deberás volver a ingresarlos.",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#e91e63",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        setUnconfirmOrder();
        clearClientInfo();
        router.push("/carrito").then(() => window.scrollTo(0, 0));
      }
    });
  };

  const confirmTransaction = () => {
    const postCartOrder = async () => {
      try {
        const data = await postOrder(cartItems, shopData, userId, authToken);
        if (shopData.tipoDeEntrega == 3)
          await patchOrderTodelivered(data.id, authToken);
        setOpen(false);
        router
          .push(`/carrito/finalizarPedido/${data.id}`)
          .then(() => window.scrollTo(0, 0))
          .then(() => {
            clearClientInfo();
            clearAllItemsFromCart();
          });
      } catch (error) {
        setOpen(false);
        if (error.response.status === 401) {
          const noStockItems = JSON.parse(error.response.data.message);
          const outOfStockTable = (
            <OutOfStockTableComponent items={noStockItems} />
          );
          Swal.fire({
            titleText: "Error en Orden",
            html: ReactDOMServer.renderToStaticMarkup(outOfStockTable),
            reverseButtons: true,
            confirmButtonColor: "#00bcd4",
            confirmButtonText: "Aceptar",
          }).then(() => clearNoStockItems(noStockItems));
        } else {
          router.push("/error").then(() => window.scrollTo(0, 0));
        }
      }
    };
    setOpen(true);
    postCartOrder();
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

  const getAddress = (addressInfo) => {
    let address = "";

    address = `${addressInfo.direccionEntrega.street} ${addressInfo.direccionEntrega.streetNumber}`;
    address =
      address +
      `${addressInfo.floor ? " " + addressInfo.floor + "°" : ""}${
        addressInfo.apartment ? " " + addressInfo.apartment : ""
      }`;

    return address;
  };

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Finalizar pedido</title>
        <meta name="author" content="Dealshop" />
        <meta
          name="description"
          content="Detalle de la orden en Dealshop"
          key="title"
        />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  if (getIsLoading) {
    return (
      <Fragment>
        {header()}
        <Spinner />
      </Fragment>
    );
  }

  return (
    <div style={{ zIndex: 5 }}>
      {header()}
      <PageContainer>
        <CartStepperComponent activeStep={2} />
        <h2 style={Styles.title}>Datos del pedido</h2>
        <ParentContainer>
          <NormalTitle>Datos del cliente</NormalTitle>
          <NormalTitle>Datos de la facturación</NormalTitle>
          <DatosContainer>
            <MobileTitle>Datos del cliente</MobileTitle>
            <p style={Styles.semibold}>
              Nombre: <span style={Styles.light}>{shopData.nombreCliente}</span>
            </p>
            <p style={Styles.semibold}>
              Tipo de entrega:{" "}
              <span style={Styles.light}>
                {switchTipoEntrega(shopData.tipoDeEntrega)}
              </span>
            </p>
            {shopData.direccionEntrega ? (
              <p style={Styles.semibold}>
                Dirección de entrega:{" "}
                <span style={Styles.light}>{getAddress(shopData)}</span>
              </p>
            ) : (
              <Fragment />
            )}
            <p style={Styles.semibold}>
              Fecha de entrega:{" "}
              <span style={Styles.light}>{shopData.fecha}</span>
            </p>
            <p style={Styles.semibold}>
              Notas: <span style={Styles.light}>{shopData.notas}</span>
            </p>
          </DatosContainer>
          <DatosContainer>
            <MobileTitle>Datos de la facturación</MobileTitle>
            <p style={Styles.semibold}>
              Total costo productos:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={cost} />
              </span>
            </p>
            <p style={Styles.semibold}>
              Subtotal venta:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={total} />
              </span>
            </p>
            <p style={Styles.semibold}>
              Costo del envío:{"  "}
              <span style={Styles.light}>
                <CurrencyText value={shopData.costoEnvio} />
              </span>
            </p>
            <p style={Styles.bold}>
              Total de la venta:{"  "}
              <CurrencyText value={total + shopData.costoEnvio} />
            </p>
            <p style={Styles.bold}>
              Comisión:{"  "}
              <CurrencyText
                value={subVendedor ? commission * 0.8 : commission}
              />
            </p>
          </DatosContainer>
        </ParentContainer>
        <h3 style={{ color: "#00bcd4", fontSize: "1.2rem" }}>
          Detalle del carrito
        </h3>
        <CartDetailTableComponent items={cartItems} />
        <div style={Styles.buttonsContainer}>
          <CustomButtonComponent
            onClick={editCart}
            color="secondary"
            style={Styles.buttons}
          >
            Editar el carrito
          </CustomButtonComponent>
          <CustomButtonComponent
            onClick={confirmTransaction}
            style={Styles.buttons}
          >
            Finalizar pedido
          </CustomButtonComponent>
        </div>
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
    fontSize: "0.9rem",
    padding: "10px",
    marginLeft: "10px",
  },
};

const PageContainer = styled.div`
  padding: 20px 80px;
  position: relative;
  z-index: 1000;
  @media screen and (max-width: 900px) {
    padding: 20px 10px;
  }
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

FinalizarPedido.propTypes = {
  cartItems: PropTypes.array.isRequired,
  cost: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  commission: PropTypes.number.isRequired,
  shopData: PropTypes.object.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  clearClientInfo: PropTypes.func.isRequired,
  clearAllItemsFromCart: PropTypes.func.isRequired,
  clearNoStockItems: PropTypes.func.isRequired,
  setUnconfirmOrder: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  authToken: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cost: selectCartItemsCost,
  total: selectCartItemsTotal,
  commission: selectCartItemsCommission,
  shopData: selectClientData,
  isConfirmed: selectIsconfirmed,
  userId: selectUserId,
  subVendedor: selectIsSubSeller,
  authToken: selectUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  clearClientInfo: () => dispatch(clearClientInfo()),
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart()),
  clearNoStockItems: (items) => dispatch(clearNoStockItems(items)),
  setUnconfirmOrder: () => dispatch(setUnconfirmOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FinalizarPedido);
