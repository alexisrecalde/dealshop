import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import Swal from "sweetalert2";
import { ToastContainer } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "primereact/button";
import Spinner from "../../components/spinner/spinner.component";
import CartForm from "../../components/forms/cartForm/cartForm.component";
import CartTableComponent from "../../components/table/cartTable/cartTable.component.jsx";
import CustomButtonComponent from "../../components/customButton/customButton.component";
import CartStepperComponent from "../../components/cartStepper/cartStepper.component";
import { Card } from "primereact/card";

import { clearAllItemsFromCart } from "../../redux/cart/cart.actions.js";
import {
  setClientInfo,
  setConfirmOrder,
} from "../../redux/shopData/shopData.actions";
import {
  selectCartItemsQty,
  selectCartItemsTruckDelivery,
} from "../../redux/cart/cart.selector.js";
import { selectIsconfirmed } from "../../redux/shopData/shopData.selector";
import { selectUserToken } from "../../redux/user/user.selector";
import { deliveryVehicle } from "../../utils/constants.utils";
import { getShippingData } from "../../queries/cart/cart.queries";
import CarritoCliente from "../../components/carritoCliente";

const Cart = ({
  cartItemsQty,
  isConfirmed,
  isTruckDelivery,
  authToken,
  clearAllItemsFromCart,
  setClientInfo,
  setConfirmOrder,
}) => {
  const router = useRouter();

  // const [getIsLoading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);

  // const isValidDate = (fecha, tipoDeEntrega) => {
  //   if (fecha != "" && tipoDeEntrega != "VENTA_POR_MOSTRADOR") {
  //     const selectedDate = new Date(fecha);
  //     selectedDate.setHours(0, 0, 0, 0);
  //     selectedDate.setDate(selectedDate.getDate() + 1);

  //     let minValidDate = new Date();

  //     switch (tipoDeEntrega) {
  //       case "RETIRO_POR_SUCURSAL":
  //         if (
  //           minValidDate.getHours() > 17 ||
  //           (minValidDate.getHours() === 17 && minValidDate.getMinutes() > 14)
  //         ) {
  //           minValidDate.setDate(minValidDate.getDate() + 1);
  //         }
  //         break;
  //       case "ENVIO_A_DOMICILIO":
  //         if (
  //           minValidDate.getHours() > 11 ||
  //           (minValidDate.getHours() === 11 && minValidDate.getMinutes() > 29)
  //         ) {
  //           minValidDate.setDate(minValidDate.getDate() + 1);
  //         }
  //         break;
  //     }

  //     minValidDate.setHours(0, 0, 0, 0);

  //     if (selectedDate < minValidDate) {
  //       return false;
  //     }
  //   }

  //   return true;
  // };

  // const onConfirm = (e) => {
  //   e.preventDefault();
  //   const deliveryType = getValue.tipoDeEntrega;

  //   if (
  //     (deliveryType == "ENVIO_A_DOMICILIO" &&
  //       getValue.direccionEntrega == null) ||
  //     (deliveryType == "ENVIO_A_DOMICILIO" &&
  //       !/^[0-9]+/.test(getValue.direccionEntrega.streetNumber))
  //   ) {
  //     Swal.fire({
  //       titleText: "Error",
  //       text: "Ingrese una dirección válida para poder continuar.",
  //       icon: "error",
  //       confirmButtonText: "OK",
  //       confirmButtonColor: "#00bcd4",
  //     });
  //   } else {
  //     if (isValidDate(getValue.fecha, deliveryType)) {
  //       Swal.fire({
  //         titleText: "¿Deseas confirmar el pedido?",
  //         text: 'Recordá que si no ingresaste el "Precio de venta" de algún producto, el mismo será procesado con el precio sugerido y no podrá ser cambiado posteriormente.',
  //         icon: "warning",
  //         showCancelButton: true,
  //         reverseButtons: true,
  //         confirmButtonColor: "#e91e63",
  //         cancelButtonText: "Cancelar",
  //         confirmButtonText: "Confirmar",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           setOpen(true);
  //           setClientInfo(getValue);
  //           setConfirmOrder();
  //           router
  //             .push("/carrito/finalizarPedido")
  //             .then(() => window.scrollTo(0, 0));
  //         }
  //       });
  //     } else {
  //       Swal.fire({
  //         titleText: "Error",
  //         text: "Ingresa una fecha válida para poder continuar.",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //         confirmButtonColor: "#00bcd4",
  //       });
  //     }
  //   }
  // };

  const goToAllProducts = () => {
    router.push("/productos").then(() => window.scrollTo(0, 0));
  };

  const header = () => {
    return (
      <Head>
        <title>Dealshop - Carrito</title>
        <meta name="author" content="Dealshop" />
        <meta
          name="description"
          content="Carrito orden en Dealshop"
          key="title"
        />
        <meta name="owner" content="Dealshop" />
      </Head>
    );
  };

  return (
    <div>
      {header()}
      <div className="container-cliente-cart" style={{ zIndex: "10" }}>
        {cartItemsQty > 0 ? (
          <>
            <h2 className="title-compras">
              ¿Cómo querés recibir ó retirar tu compra?
            </h2>
            <CarritoCliente isTruckDelivery={isTruckDelivery} />
          </>
        ) : (
          <Card
            style={{
              padding: "20px",
              minHeight: "50vh",
              width: "50%",
              margin: "20px auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              zIndex: "10",
            }}
            className="card-carrito-vacio"
          >
            <h2>Tu carrito está vacío</h2>
            <div
              style={{ color: "#999", fontSize: "15px", fontWeight: "inherit" }}
            >
              ¿No sabés qué comprar? ¡Miles de productos te esperan!
            </div>
            <Button
              className="button-slide sign-in-button"
              style={{
                width: "auto",
                margin: "0 auto",
                marginTop: "20px",
                zIndex: "10",
              }}
              onClick={() => {
                goToAllProducts();
              }}
            >
              Ver productos
            </Button>
          </Card>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

Cart.propTypes = {
  cartItemsQty: PropTypes.number.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isTruckDelivery: PropTypes.bool.isRequired,
  authToken: PropTypes.string.isRequired,
  setClientInfo: PropTypes.func.isRequired,
  clearAllItemsFromCart: PropTypes.func.isRequired,
  setConfirmOrder: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartItemsQty: selectCartItemsQty,
  isConfirmed: selectIsconfirmed,
  isTruckDelivery: selectCartItemsTruckDelivery,
  authToken: selectUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  setClientInfo: (clientData) => dispatch(setClientInfo(clientData)),
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart()),
  setConfirmOrder: () => dispatch(setConfirmOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
