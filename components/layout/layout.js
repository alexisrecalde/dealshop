import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import Head from "next/head";
// import BarUser from "../barUser/barUser.component";
import FooterComponent from "../footer/footer.component";
import NavbarComponent from "../navbar/navbar.component";
import { useRouter } from "next/router";
import {
  selectUserType,
  selectIsUserLogged,
} from "../../redux/user/user.selector";
import { Sidebar } from "primereact/sidebar";
import ContainerDisplayMenu from "../containerDisplayMenu";
import Help from "../help";
import Bienvenido from "../GuideTour";
import Tooltip from "@mui/material/Tooltip";
import dynamic from "next/dynamic";
import CookieConsent from "react-cookie-consent";
import { useCookies } from "react-cookie";
import { motion, MotionConfig } from "framer-motion";
import ContainerSearchSideMobile from "../containerSearchSideMobile";
import { IoIosArrowBack } from "react-icons/io";

const BarUser = dynamic(() => import("../barUser/barUser.component"), {
  ssr: false,
});

const Layout = ({ children, userType, isUserLogged }) => {
  const [open, setOpen] = useState(false);
  const [openSearchSide, setOpenSearchSide] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [mobileView, setMobileView] = useState(false);
  const [startGuide, setStartGuide] = useState(false);
  const [show, setShow] = useState(false);
  const [stepsEnabled, setStepsEnabled] = useState(false);
  const router = useRouter();
  const [lastSearch, setLastSearch] = useCookies(["LAST_SEARCH"]);

  const cookieConsentRef = React.useRef();

  const showHeader =
    router.pathname == "/login"
      ? false
      : router.pathname == "/register"
      ? false
      : true;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [window.innerWidth]);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const Guide = () => {
      if (isUserLogged) {
        const step1 = localStorage.getItem("step1", 1);
        if (!step1) {
          if (userType != 6) {
            setStepsEnabled(true);
          }
        }
      }
    };
    Guide();
  }, [isUserLogged]);

  const header = () => {
    return (
      <Head>
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
    <>
      {/* <div
        style={{
          width: "100%",
          height: "25px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
        }}
      >
        <marquee
          class="marquee"
          behavior="scroll"
          direction="left"
          style={{
            color: "white",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
          <span>¡Envios gratis todo el mes de septiembre!</span>
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
          <img
            src="img/carton.png"
            alt=""
            style={{ width: "15px", marginLeft: "400px" }}
          />
          <span>¡Envios gratis todo el mes de septiembre!</span>
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
          <img
            src="img/carton.png"
            alt=""
            style={{ width: "15px", marginLeft: "400px" }}
          />
          <span>¡Envios gratis todo el mes de septiembre!</span>
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
          <img
            src="img/carton.png"
            alt=""
            style={{ width: "15px", marginLeft: "400px" }}
          />
          <span>¡Envios gratis todo el mes de septiembre!</span>
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
          <img
            src="img/carton.png"
            alt=""
            style={{ width: "15px", marginLeft: "400px" }}
          />
          <span>¡Envios gratis todo el mes de septiembre!</span>
          <img src="img/carton.png" alt="" style={{ width: "15px" }} />
        </marquee>
      </div> */}
      {header()}
      {startGuide && (
        <Bienvenido
          setStartGuide={setStartGuide}
          startGuide={startGuide}
          setGuideTourBilletera={setGuideTourBilletera}
        ></Bienvenido>
      )}
      {showHeader ? (
        <BarUser
          setVisibleLeft={setVisibleLeft}
          visibleLeft={visibleLeft}
          setStepsEnabled={setStepsEnabled}
          stepsEnabled={stepsEnabled}
        />
      ) : null}
      {showHeader ? (
        <NavbarComponent
          open={open}
          setOpen={setOpen}
          openSearchSide={openSearchSide}
          setOpenSearchSide={setOpenSearchSide}
          setLastSearch={setLastSearch}
          lastSearch={lastSearch.LAST_SEARCH}
          mobileViewLay={mobileView}
        />
      ) : null}
      <Sidebar
        visible={visibleLeft}
        className="help-sidebar"
        onHide={() => setVisibleLeft(false)}
        style={mobileView ? { width: "90%" } : { width: "50%" }}
      >
        <h2 className="title-compras">Preguntas frecuentes</h2>
        <Help help={true} />
      </Sidebar>
      <Sidebar
        style={{ zIndex: "99999999" }}
        className="side-bar-mobile"
        visible={open}
        onHide={() => setOpen(!open)}
      >
        <ContainerDisplayMenu setOpen={setOpen}></ContainerDisplayMenu>
      </Sidebar>
      <Sidebar
        style={{ zIndex: "99999999", position: "relative" }}
        className="side-bar-mobile"
        position="right"
        visible={openSearchSide}
        showCloseIcon={false}
        onHide={() => setOpenSearchSide(!openSearchSide)}
      >
        <>
          <h2
            style={{
              position: "absolute",
              display: "flex",
              top: "10px",
              fontSize: "15px",
              color: "#000",
              alignItems: "center",
            }}
          >
            <IoIosArrowBack
              style={{ fontSize: "20px", marginRight: "10px" }}
              onClick={() => setOpenSearchSide(false)}
            />{" "}
            Cerrar
          </h2>
          <ContainerSearchSideMobile setOpenSearchSide={setOpenSearchSide} />
        </>
      </Sidebar>
      {children}
      {showHeader ? <FooterComponent /> : null}
      {show && (
        <MotionConfig reducedMotion="user">
          <Tooltip title="Contactanos!" className="contact-guide">
            <motion.a
              href="https://wa.me/+5401127215538/?text=Hola,%20quisiera%20contactarme%20con%20Dealshop!%20"
              target="_blank"
              className={`contact-index-button ${
                show && `show-conctact-index-button `
              }`}
              animate={{
                scale: [1, 1.2, 1.2, 1, 1],
                rotate: [0, 0, 360, 360, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 20,
              }}
            >
              <i class="fa fa-regular fa-comment"></i>
            </motion.a>
          </Tooltip>
        </MotionConfig>
      )}
      <CookieConsent
        ref={cookieConsentRef}
        location="bottom"
        buttonText="Aceptar"
        cookieName="cookieAccept"
        className="cookie-container"
        style={{
          background: "#2B373B",
          position: "fixed",
          height: "100%",
        }}
        buttonStyle={{ display: "none" }}
        expires={365}
      >
        <div
          className="container-modal-cookie"
          style={{
            backgroundColor: "#fff",
            color: "black",
            margin: "auto",
          }}
        >
          <div style={{ display: "flex" }}>
            <h2 style={{ fontSize: "18px" }}>Politica de Cookies</h2>
            <img
              src="img/Group 505.png"
              alt="logo"
              style={{ width: "50px", height: "50px", marginLeft: "auto" }}
            />
          </div>
          <div style={{ color: "#696969", fontSize: "16px" }}>
            Utilizamos cookies propias y de terceros para obtener datos
            estadísticos de la navegación de nuestros usuarios y mejorar
            nuestros servicios. Si acepta o continúa navegando, consideramos que
            acepta su uso.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => cookieConsentRef.current.accept()}
              className="button-accept-cookie"
            >
              Aceptar y continuar
            </button>
            <button
              onClick={() => cookieConsentRef.current.decline()}
              className="button-accept-cookie"
              style={{
                backgroundColor: "white",
                border: "2px solid #e91e63",
                color: "#e91e63",
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      </CookieConsent>
    </>
  );
};

Layout.propTypes = {
  userType: PropTypes.number.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userType: selectUserType,
  isUserLogged: selectIsUserLogged,
});

export default connect(mapStateToProps, null)(Layout);
