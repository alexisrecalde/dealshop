import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  selectIsUserLogged,
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUserType,
  selectUserWalletId,
  selectUser,
} from "../../../redux/user/user.selector";
import {
  selectCartItemsQty,
  selectCartItemsTruckDelivery,
  selectCartItemsTotal,
  selectCartItems,
} from "../../../redux/cart/cart.selector.js";
import { useForm, Controller } from "react-hook-form";
import { clearAllItemsFromCart } from "../../../redux/cart/cart.actions";
import { createStructuredSelector } from "reselect";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import sellOptions from "../../../components/utils/useSellingApi";
import { Dialog } from "primereact/dialog";
import {
  required,
  max,
  onlyNumber,
  onlyNumberNumber,
  passwordValid,
} from "../../utils/useMessageError";
import { omit, isEmpty, noop } from "lodash";
import { getLatLngByZipcode } from "../../utils/getLatLon";

const FormNoLogeado = ({
  cartItems,
  clearAllItemsFromCart,
  isTruckDelivery,
  setShipping,
  shipping,
}) => {
  const [preDetails, setPreDetails] = useState("");
  const [searchAddress, setSearchAddress] = useState(false);
  const [enableContinue, setEnableContinue] = useState(false);
  const [modalSell, setModalSell] = useState(false);
  const [clientInfo, setClientInfo] = useState({
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
    lat: "-324234",
    lon: "-4234324",
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
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
      lat: "-324234",
      lon: "-4234324",
    },
  });

  const { postSellClientNoLoged } = sellOptions();

  const values = getValues();

  const emptyFields = (object) => {
    let res = false;

    for (const key in object) {
      if (object[key] === "") {
        return true;
      } else {
      }
    }

    return res;
  };

  const onComprar = async () => {
    const saleDetailsItem = {
      clientAddressId: "Usuario no logeado",
      note: "Usuario no logeado",
      shippingPrice: shipping.price,
      products: cartItems,
      link: "http://localhost:3000/cart/success",
      client: values,
    };
    try {
      const sale = await postSellClientNoLoged(saleDetailsItem);
      setPreDetails(sale);
      setModalSell(true);
    } catch (e) {
      throw e;
    }
  };

  const onHandleContinue = async () => {
    setSearchAddress(true);
    if (Object.keys(errors).length > 0) {
    } else {
      const emply = emptyFields(values);
      if (emply) {
        return;
      } else {
        const address = `${values.street} ${values.streetHeigth}, ${values.address}, ${values.province}`;
        const postal = `${values.postalCode}`;
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWFpbCI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJPw7FhIiwicGhvbmUiOjQ0MTI2Mzc0LCJkbmkiOjM3Njc3MjEyLCJpc0VuYWJsZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMDFUMDE6MzA6MjIuMzIyWiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6bnVsbCwiaWF0IjoxNjA5NjE0OTkxfQ._I8a3D3VDewI-gSCIh72IgOkPCUUbvhkSr_JxC71Hg0";
        getLatLngByZipcode(
          token,
          address,
          postal,
          setShipping,
          isTruckDelivery
        );
        setTimeout(() => {
          setSearchAddress(false);
        }, 1500);
      }
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
    <>
      <h3>Informacion usuario</h3>

      <div className="container-info-mis-datos-inputs">
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Nombre
            </label>
            <Controller
              name="firstName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El nombre es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  value={value}
                  name={name}
                  aria-describedby="username1-help"
                  className="block"
                  onChange={(value) => onChange(value)}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.firstName && (
              <small className="p-error">{errors.firstName.message}</small>
            )}
          </div>
        </div>
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Apellido
            </label>
            <Controller
              name="lastName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El apellido es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="lastName"
                  aria-describedby="username1-help"
                  className="block"
                  value={value}
                  name={name}
                  onChange={(value) => onChange(value)}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.lastName && (
              <small className="p-error">{errors.lastName.message}</small>
            )}
          </div>
        </div>
      </div>
      <div className="container-info-mis-datos-inputs">
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              DNI
            </label>
            <Controller
              name="dni"
              control={control}
              rules={{
                required: required("dni"),
                pattern: {
                  value: /^[0-9]*$/,
                  message: onlyNumber("dni"),
                },
                maxLength: {
                  value: 8,
                  message: max("Dni", 8),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="dni"
                  value={value}
                  name={name}
                  // name="dni"
                  aria-describedby="username1-help"
                  className="block"
                  // value={clientInfo.dni}
                  onChange={(value) => onChange(value)}
                  //onChange={onValueChangeClient}
                />
              )}
            />
            {errors.dni && (
              <small className="p-error">{errors.dni.message}</small>
            )}
          </div>
        </div>
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Telefono
            </label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El telefono es requerido",
                },
                pattern: {
                  value: /^[0-9 () + , . -- x]+$/,
                  message: onlyNumber("telefono"),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="phone"
                  value={value}
                  name={name}
                  // name="phone"
                  aria-describedby="username1-help"
                  className="block"
                  onChange={(value) => onChange(value)}
                  // value={clientInfo.phone}
                  // onChange={onValueChangeClient}
                />
              )}
            />
            {errors.phone && (
              <small className="p-error">{errors.phone.message}</small>
            )}
          </div>
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <label htmlFor="username1" className="block label-inputs">
          Email
        </label>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {
              value: true,
              message: "El email es requerido",
            },
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Se permite solo formato e-mail",
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <InputText
              id="email"
              // name="email"
              value={value}
              name={name}
              aria-describedby="username1-help"
              className="block"
              // value={clientInfo.email}
              onChange={(value) => onChange(value)}
              //onChange={onValueChangeClient}
              style={{
                width: "100%",
                marginTop: "5px",
              }}
            />
          )}
        />
        {errors.email && (
          <small className="p-error">{errors.email.message}</small>
        )}
      </div>
      <h3>Tu domicilio</h3>
      <div className="container-info-mis-datos-inputs">
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Calle
            </label>
            <Controller
              name="street"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Nombre de calle es requerido",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="street"
                  // name="street"
                  aria-describedby="username1-help"
                  className="block"
                  value={value}
                  name={name}
                  // value={clientInfo.street}
                  onChange={(value) => onChange(value)}
                  // onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.street && (
              <small className="p-error">{errors.street.message}</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Localidad
            </label>
            <Controller
              name="address"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La localidad es requerida",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="address"
                  // name="address"
                  value={value}
                  name={name}
                  aria-describedby="username1-help"
                  className="block"
                  // value={clientInfo.address}
                  onChange={(value) => onChange(value)}
                  //onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.address && (
              <small className="p-error">{errors.address.message}</small>
            )}
          </div>

          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Piso/departamento
            </label>
            <Controller
              name="departamentNumber"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Piso/opcional es requerido o llenar con -",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="departamentNumber"
                  // name="departamentNumber"
                  aria-describedby="username1-help"
                  className="block"
                  value={value}
                  name={name}
                  // value={clientInfo.departamentNumber}
                  onChange={(value) => onChange(value)}
                  // onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.departamentNumber && (
              <small className="p-error">
                {errors.departamentNumber.message}
              </small>
            )}
          </div>
        </div>
        <div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Número
            </label>
            <Controller
              name="streetHeigth"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El numero de calle es requerido",
                },
                pattern: {
                  value: /^[0-9 () + , . -- x]+$/,
                  message: onlyNumberNumber(),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="streetHeigth"
                  // name="streetHeigth"
                  aria-describedby="username1-help"
                  className="block"
                  value={value}
                  name={name}
                  // value={clientInfo.streetHeigth}
                  onChange={(value) => onChange(value)}
                  //onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.streetHeigth && (
              <small className="p-error">{errors.streetHeigth.message}</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Provincia
            </label>
            <Controller
              name="province"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "La provincia es requerida",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Se permite solo letras",
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="province"
                  value={value}
                  name={name}
                  // name="province"
                  aria-describedby="username1-help"
                  className="block"
                  // value={clientInfo.province}
                  onChange={(value) => onChange(value)}
                  //onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.province && (
              <small className="p-error">{errors.province.message}</small>
            )}
          </div>
          <div className="field">
            <label htmlFor="username1" className="block label-inputs">
              Código postal
            </label>
            <Controller
              name="postalCode"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "El codigo postal es requerido",
                },
                pattern: {
                  value: /^[0-9 () + , . -- x]+$/,
                  message: onlyNumber("codigo postal"),
                },
              }}
              render={({ field: { onChange, value, name } }) => (
                <InputText
                  id="postalCode"
                  // name="postalCode"
                  value={value}
                  name={name}
                  aria-describedby="username1-help"
                  className="block"
                  // value={clientInfo.postalCode}
                  onChange={(value) => onChange(value)}
                  //onChange={onValueChangeClient}
                  style={{ textTransform: "capitalize" }}
                />
              )}
            />
            {errors.postalCode && (
              <small className="p-error">{errors.postalCode.message}</small>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        {searchAddress ? (
          <Button
            className="button-inicio-sesion"
            style={{
              width: "auto",
              marginLeft: "auto",
              padding: "0 20px",
              zIndex: "10",
            }}
          >
            <img
              src="/img/load.svg"
              alt=""
              style={{ width: "40px", height: "40px" }}
            />
          </Button>
        ) : shipping ? (
          <Button
            className="button-inicio-sesion"
            style={{
              width: "auto",
              marginLeft: "auto",
              padding: "0 20px",
              zIndex: "10",
            }}
            //disabled={enableContinue}
            disabled={Object.keys(errors).length > 0}
            onClick={() => onComprar()}
          >
            Comprar!
          </Button>
        ) : (
          <Button
            className="button-inicio-sesion"
            style={{
              width: "auto",
              marginLeft: "auto",
              padding: "0 20px",
              zIndex: "10",
            }}
            //disabled={enableContinue}
            disabled={Object.keys(errors).length > 0}
            type="submit"
            onClick={() => onHandleContinue()}
          >
            Continuar
          </Button>
        )}
      </div>

      <Dialog
        className="dialog-finalizar-compra"
        visible={modalSell}
        style={{ width: "500px" }}
        onHide={() => setModalSell(false)}
      >
        <div className="container-felicitaciones">
          <img src="/img/check.png" alt="" />
          <h3>¡Estas a un paso de finalizar tu compra!</h3>
          <div className="div-felicidades-1">
            Te enviaremos a un sitio seguro donde podras pagar tus productos!
          </div>
          <div className="div-felicidades-2">
            Seras redirigido en 3 segundos...
          </div>
        </div>
      </Dialog>
    </>
  );
};

FormNoLogeado.propTypes = {
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
  isTruckDelivery: selectCartItemsTruckDelivery,
  total: selectCartItemsTotal,
  cartItems: selectCartItems,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormNoLogeado);
