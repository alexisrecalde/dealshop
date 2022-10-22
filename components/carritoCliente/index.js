import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { RadioButton } from "primereact/radiobutton";
import {
  selectIsUserLogged,
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUserType,
  selectUserWalletId,
  selectUser,
} from "../../redux/user/user.selector";
import { clearAllItemsFromCart } from "../../redux/cart/cart.actions";
import {
  setClientInfo,
  setConfirmOrder,
} from "../../redux/shopData/shopData.actions";
import { Dialog } from "primereact/dialog";
import { createStructuredSelector } from "reselect";
import {
  selectCartItemsQty,
  selectCartItemsTruckDelivery,
  selectCartItemsTotal,
  selectCartItems,
} from "../../redux/cart/cart.selector.js";
import { selectIsconfirmed } from "../../redux/shopData/shopData.selector";
import CartDomicilio from "./cartDomicilio";
import CartDomicilioRegister from "./cartDomicilioRegister";
import CartItemsCliente from "./cartItemsCliente";
import { CurrencyInput, CurrencyText } from "../../utils/number.utils";
import { getClientInfo } from "../../queries/users/users.queries";
import sellOptions from "../utils/useSellingApi";
import ModalSelling from "./modalSelling";
import { CircularProgress } from "@mui/material";

const CarritoCliente = ({
  isUserLogged,
  total,
  authToken,
  cartItems,
  itemsQty,
  isTruckDelivery,
  cartItemsQty,
  user,
  clearAllItemsFromCart,
}) => {
  const [option, setOption] = useState("takeaway");
  const [preDetails, setPreDetails] = useState("");
  const [modalSell, setModalSell] = useState(false);
  const [noAddressFound, setNoAddressFound] = useState(false);
  const [clientInfo, setClientInfo] = useState();
  const [onLoding, setOnLoading] = useState(false);
  const [shipping, setShipping] = useState({
    price: 0,
    shippingType: "",
  });
  const [totalPurchase, setTotalPurchase] = useState(total);

  const [domicilio, setDomicilio] = useState({
    street: "",
    streetHeigth: "",
    postalCode: "",
    province: "",
    address: "",
    departamentNumber: "",
  });

  const [itemToSendSale, setItemToSendSale] = useState({
    clientAddressId: "",
    note: `Venta usuario logeado ${user.email}, telefono ${user.phone} por sucursal`,
    products: cartItems,
    link: "http://localhost:3000/cart/success",
    client: {
      address: "",
      postalCode: "",
      province: "",
      street: "",
      streetHeigth: "",
      departamentNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dni: "",
    },
  });

  const defaultValueTakeaway = {
    clientAddressId: "12e",
    note: `Venta usuario logeado ${user.email}, telefono ${user.phone}, retiro por sucursal`,
    products: cartItems,
    shippingPrice: 0,
    // shippingType: "",
    deliveryTypeId: 2,
    // link: "http://localhost:3000/cart/success",
    client: {
      address: "",
      postalCode: "",
      province: "",
      street: "",
      streetHeigth: "",
      departamentNumber: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dni: "",
    },
  };

  const { postSellClientLoged } = sellOptions();
  const date = new Date();
  const horarioLimite = date.getHours();

  useEffect(() => {
    const getClient = async () => {
      if(isUserLogged){
        try {
          const response = await getClientInfo(authToken);
          setClientInfo(response);
        } catch (error) {
          throw error;
        }
      }
    };
    getClient();
  }, []);

  useEffect(() => {
    const changeOption = () => {
      const sellerId = localStorage.getItem("sellerId");

      if (option == "takeaway") {
        setItemToSendSale(defaultValueTakeaway);
        setTotalPurchase(total);
      } else if (option == "shipping") {
        setTotalPurchase(total + shipping.price);
        setItemToSendSale({
          clientAddressId: clientInfo.ClientAdress[0].id,
          note: `Venta usuario logeado ${user.email}, telefono ${user.phone}, envio a domicilio`,
          shippingPrice: shipping.price,
          // shippingType: shipping.shippingType,
          shippingType: shipping.shippingType,
          products: cartItems,
          deliveryTypeId: 1,
          link: sellerId,
          client: {
            address: clientInfo.ClientAdress[0].address,
            postalCode: clientInfo.ClientAdress[0].postalCode,
            province: clientInfo.ClientAdress[0].province,
            street: clientInfo.ClientAdress[0].stree,
            streetHeigth: clientInfo.ClientAdress[0].streetHeigth,
            departamentNumber: clientInfo.ClientAdress[0].departamentNumber,
            firstName: clientInfo.firstName,
            lastName: clientInfo.lastName,
            email: clientInfo.email,
            phone: clientInfo.phone,
            dni: clientInfo.dni,
          },
        });
      }
    };
    changeOption();
  }, [option]);

  const onClickOptionShipping = (item) => {
    setOption(item);
  };

  const onHandleContinue = async () => {
    setOnLoading(true);
    if (isUserLogged) {
      try {
        const sale = await postSellClientLoged(authToken, itemToSendSale);
        setPreDetails(sale);
        setOnLoading(false);
        setModalSell(true);
      } catch (e) {
        throw e;
      }
    } else {
      setOnLoading(false);
      throw e;
    }
  };

  useEffect(() => {
    if (modalSell) {
      const timer = setTimeout(
        () => (window.location.href = `${preDetails && preDetails.data.link}`),
        3500
      );
      // clearAllItemsFromCart();
      return () => clearTimeout(timer);
    }
  }, [modalSell]);

  return (
    <div className="container-cards-cliente-cart" style={{ zIndex: 10 }}>
      <Card style={{ zIndex: 10 }}>
        {isUserLogged ? (
          <h2 className="title-cart-item-container">Domicilio</h2>
        ) : (
          <h2 className="title-cart-item-container">No has iniciado sesion</h2>
        )}

        {isUserLogged ? (
          <CartDomicilio
            setDomicilio={setDomicilio}
            domicilio={domicilio}
            noAddressFound={noAddressFound}
            setNoAddressFound={setNoAddressFound}
            isTruckDelivery={isTruckDelivery}
            setShipping={setShipping}
          />
        ) : (
          <CartDomicilioRegister
            setShipping={setShipping}
            shipping={shipping}
          />
        )}
        {isUserLogged ? (
          <>
            <h2 className="title-cart-item-container">
              ¿Te lo enviamos o venís a buscarlo?
            </h2>
            <Card
              className={`card-domicilio envio-item-option ${
                option === "takeaway" && "selected-radio"
              }`}
            >
              <div className="container-options-radios-cart-cliente">
                <RadioButton
                  inputId="takeaway"
                  name="takeaway"
                  value="takeaway"
                  onChange={(e) => onClickOptionShipping(e.value)}
                  checked={option === "takeaway"}
                />
                <div style={{ marginLeft: "20px" }}>
                  <div className="item-card-domicilio-calle options-cart">
                    Retiro por local Gregorio de Laferrere
                  </div>
                  <span className="item-card-domicilio-cart">
                    En Carlos Casares 4337, Gregorio de Laferrere, Buenos Aires
                  </span>
                </div>
              </div>
            </Card>
            {noAddressFound ? null : (
              <Card
                className={`card-domicilio ${
                  option === "shipping" && "selected-radio"
                }`}
              >
                <div className="container-options-radios-cart-cliente">
                  <RadioButton
                    inputId="shipping"
                    name="shipping"
                    value="shipping"
                    onChange={(e) => onClickOptionShipping(e.value)}
                    checked={option === "shipping"}
                  />
                  <div style={{ marginLeft: "20px", width: "100%" }}>
                    <div className="item-card-domicilio-calle options-cart">
                      Te lo enviamos a:
                    </div>
                    <div className="container-envio-cart-domicilio">
                      <span className="item-card-domicilio-cart">
                        En{" "}
                        {domicilio.street !== "" &&
                          `${domicilio.street} ${domicilio.streetHeigth}, ${domicilio.address}, ${domicilio.province}`}
                      </span>
                      <span className="llega-hoy-chip">
                        {isTruckDelivery
                          ? "Llega entre 2-3 dias!"
                          : horarioLimite > 17 ? "Llega mañana!" : "Llega hoy!" }
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </>
        ) : null}
        {isUserLogged ? (
          <div style={{ display: "flex", width: "100%" }}>
            <button
              className="button-inicio-sesion"
              style={{ width: "200px", marginLeft: "auto" }}
              onClick={() => onHandleContinue()}
            >
              {onLoding ? (
                <CircularProgress
                  size={30}
                  sx={{
                    color: "#fff",
                  }}
                />
              ) : (
                "Continuar"
              )}
            </button>
          </div>
        ) : null}
      </Card>
      <Card className="item-cart-cliente">
        <h2 className="title-cart-item-container">Resumen de pedido</h2>
        <CartItemsCliente />
        {option == "shipping" && (
          <>
            <div className="price-item-card-cart-total">
              <span>Envio</span>
              {shipping && (
                <span>
                  <CurrencyText value={shipping.price} />
                </span>
              )}
            </div>
            <Divider />
          </>
        )}
        {!isUserLogged && shipping.price && (
          <>
            <div className="price-item-card-cart-total">
              <span>Envio</span>
              {shipping && (
                <span>
                  <CurrencyText value={shipping.price} />
                </span>
              )}
            </div>
            <Divider />
          </>
        )}

        {isUserLogged ? (
          <div className="price-item-card-cart-total">
            <span>Total</span>
            {totalPurchase && (
              <span>
                <CurrencyText value={totalPurchase} />
              </span>
            )}
          </div>
        ) : (
          shipping && (
            <div className="price-item-card-cart-total">
              <span>Total</span>
              {shipping && (
                <span>
                  <CurrencyText value={total + shipping.price} />
                </span>
              )}
            </div>
          )
        )}
      </Card>
      <Dialog
        className="dialog-finalizar-compra"
        // header="Estas a un paso de finalizar tu compra"
        visible={modalSell}
        style={{ width: "500px" }}
        onHide={() => setModalSell(false)}
      >
        <div className="container-felicitaciones">
          <img src="/img/check.png" alt="dealshop compra directa" />
          <h3>¡Estas a un paso de finalizar tu compra!</h3>
          <div className="div-felicidades-1">
            Te enviaremos a un sitio seguro donde podras pagar tus productos!
          </div>
          <div className="div-felicidades-2">
            Seras redirigido en 3 segundos...
          </div>
        </div>
      </Dialog>
    </div>
  );
};

CarritoCliente.propTypes = {
  cartItems: PropTypes.array.isRequired,
  itemsQty: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userCompleteName: PropTypes.string.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
  authToken: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
  walletId: PropTypes.number.isRequired,
  cartItemsQty: PropTypes.number.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isTruckDelivery: PropTypes.bool.isRequired,
  setClientInfo: PropTypes.func.isRequired,
  clearAllItemsFromCart: PropTypes.func.isRequired,
  setConfirmOrder: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  itemsQty: selectCartItemsQty,
  username: selectUsername,
  userCompleteName: selectUserCompleteName,
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
  authToken: selectUserToken,
  //   isSuperSeller: selectIsSuperSeller,
  walletId: selectUserWalletId,
  cartItemsQty: selectCartItemsQty,
  isConfirmed: selectIsconfirmed,
  isTruckDelivery: selectCartItemsTruckDelivery,
  total: selectCartItemsTotal,
  cartItems: selectCartItems,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
  setClientInfo: (clientData) => dispatch(setClientInfo(clientData)),
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart()),
  setConfirmOrder: () => dispatch(setConfirmOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CarritoCliente);
