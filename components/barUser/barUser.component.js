import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectCartItemsQty } from "../../redux/cart/cart.selector";
import {
  selectIsSuperSeller,
  selectIsUserLogged,
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUserType,
  selectUserWalletId,
} from "../../redux/user/user.selector";
import UserLoged from "./userLoged";
import { Steps } from "intro.js-react";
import "intro.js/introjs.css";
import { Badge } from "primereact/badge";

const inicio = (
  <>
    <img
      src="/img/Group 505.png"
      alt="logo"
      style={{
        width: "50px",
        height: "50px",
        position: "absolute",
        border: "2px solid #bf9dee",
        top: "-18px",
        right: 0,
        left: 0,
        borderRadius: "50%",
        margin: "0 auto",
      }}
    />
    <div style={{ width: "350px" }}>
      ¡Bienvenido a Dealshop! Ha entrado en la nueva experiencia Dealshop, donde
      puede ver información de un vistazo en todo el ecosistema de Dealshop.
      Veamos las características más importantes alojadas en su tablero!.
    </div>
  </>
);

const textoAyuda = (
  <div style={{ width: "250px" }}>
    Ahora encontraras una seccion de ayuda para todas las dudas que tengas! O
    podes comunicarte con Administracion directamente
  </div>
);

const textoSeguimiento = (
  <div style={{ width: "260px" }}>
    Podes entrar a esta opcion para ver el estado de los envios que tengas
    pendientes, para saber si fueron entregados.
  </div>
);

const textoCompartir = (
  <div style={{ width: "300px" }}>
    Tambien podes compartir tu e-commerce desde la pagina principal, a la hora
    de que su cliente haga la compra, la comision sera asignada a su billetera!
  </div>
);

const textoBilletera = (
  <div style={{ width: "250px" }}>
    Ademas podes ver el saldo que tengas en tu billetera desde la pagina
    principal!
  </div>
);

const textContacto = (
  <div style={{ width: "250px" }}>
    Comunicate directamente con nosotros ante cualquier duda sobre nuestro
    sistema!
  </div>
);

const BarUser = ({
  itemsQty,
  isUserLogged,
  userType,
  setVisibleLeft,
  visibleLeft,
  setStepsEnabled,
  stepsEnabled,
}) => {
  const [mobileView, setMobileView] = useState(false);
  const router = useRouter();
  const [initialStep, setInitialStep] = useState(0);
  const [steps, setSteps] = useState([
    {
      element: ".logo_inicio",
      title: "Inicio",
      intro: inicio,
      tooltipClass: "myTooltipClass inicioTooltip",
      highlightClass: "highlightClass",
    },
    {
      element: ".container-help-baruser",
      title: "Ayuda",
      intro: textoAyuda,
      tooltipClass: "myTooltipClass inicioTooltip",
    },
    {
      element: ".container-seguimiento",
      title: "Seguimiento de envios",
      intro: textoSeguimiento,
      tooltipClass: "myTooltipClass inicioTooltip",
    },
    {
      element: ".compartir-guide",
      title: "Comparti tu e-commerce!",
      intro: textoCompartir,
      tooltipClass: "myTooltipClass inicioTooltip",
    },
    {
      element: ".billetera-gui",
      title: "Billetera",
      intro: textoBilletera,
      tooltipClass: "myTooltipClass inicioTooltip",
    },
    {
      element: ".contact-guide",
      title: "Contactanos!",
      intro: textContacto,
      tooltipClass: "myTooltipClass inicioTooltip",
    },
  ]);

  const onExit = () => {
    setStepsEnabled(false);
    localStorage.setItem("step1", 1);
  };

  const onComplete = () => {
    localStorage.setItem("step1", 1);
    setStepsEnabled(false);
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  const goToSeguimientoEnvios = () => {
    router.push("/seguimiento-envios").then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={() => onExit()}
        onComplete={() => onComplete()}
        options={{
          hinHsEnabled: false,
          nextLabel: "Siguiente",
          prevLabel: "Atras",
          doneLabel: "Hecho",
        }}
      ></Steps>
      <div className="baruser-container">
        <div
          className="container-help-baruser"
          style={{
            position: "relative",
            fontFamily: '"Work Sans", sans-serif',
            fontWeight: "bold",
          }}
        >
          <i
            className="pi pi-info-circle p-text-secondary p-overlay-badge"
            style={{
              fontSize: "1.3rem",
              color: "rgb(136, 136, 136)",
              cursor: "pointer",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            onClick={() => setVisibleLeft(!visibleLeft)}
          ></i>
          {!mobileView ? "Centro de ayuda" : null}
        </div>
        <div
          className="container-seguimiento"
          style={{
            marginLeft: "20px",
            fontFamily: '"Work Sans", sans-serif',
          }}
          onClick={goToSeguimientoEnvios}
        >
          <i
            className="fa fa-truck p-text-secondary p-overlay-badge"
            data-pr-position="right"
            style={{
              fontSize: "1.3rem",
              color: "rgb(136, 136, 136)",
              cursor: "pointer",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            onClick={goToSeguimientoEnvios}
          ></i>
          {!mobileView ? "Segui tu compra" : null}
        </div>
        <div
          className="container-seguimiento"
          style={{
            marginLeft: "20px",
            fontFamily: '"Work Sans", sans-serif',
          }}
          onClick={goToSeguimientoEnvios}
        >
          <i
            className="fa fa-regular fa-comment p-text-secondary p-overlay-badge"
            data-pr-tooltip="Seguimiento de envios"
            data-pr-position="right"
            style={{
              fontSize: "1.3rem",
              color: "rgb(136, 136, 136)",
              cursor: "pointer",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            onClick={goToSeguimientoEnvios}
          ></i>
          {!mobileView ? "Contactanos" : null}
        </div>
        <div
          className="container-seguimiento"
          style={{
            marginLeft: "20px",
            fontFamily: '"Work Sans", sans-serif',
          }}
          onClick={goToSeguimientoEnvios}
        >
          <i
            className="fas fa-regular fa-store p-text-secondary p-overlay-badge"
            data-pr-tooltip="Seguimiento de envios"
            data-pr-position="right"
            style={{
              fontSize: "1.1rem",
              color: "rgb(136, 136, 136)",
              cursor: "pointer",
              marginRight: "5px",
              marginLeft: "5px",
            }}
            onClick={goToSeguimientoEnvios}
          ></i>
          {!mobileView ? "Sucursales" : null}
        </div>
      </div>
    </>
  );
};

BarUser.propTypes = {
  itemsQty: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userCompleteName: PropTypes.string.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
  authToken: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
  walletId: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  itemsQty: selectCartItemsQty,
  username: selectUsername,
  userCompleteName: selectUserCompleteName,
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
  authToken: selectUserToken,
  isSuperSeller: selectIsSuperSeller,
  walletId: selectUserWalletId,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BarUser);
