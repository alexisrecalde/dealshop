import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import { Divider } from "primereact/divider";
import Link from "next/link";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Avatar } from "primereact/avatar";
import {
  selectIsSuperSeller,
  selectIsUserLogged,
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUserType,
} from "../../redux/user/user.selector";
import Collapsible from "react-collapsible";
import { ImSearch } from "react-icons/im";
import { signOutUser, updateUserData } from "../../redux/user/user.actions";
import { GrContact, GrLogout } from "react-icons/gr";
import {
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineLike,
  AiOutlineInfoCircle,
  AiOutlineCompass,
  AiOutlineContacts,
  AiOutlineLogout,
} from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import AccountImg from "../navbar/avatar/accountImg";

const ContainerDisplayMenu = ({ setOpen, signOut, isUserLogged, userType }) => {
  const router = useRouter();
  const [openBrand, setOpenBrand] = useState(false);

  const onLogout = () => {
    signOut();
    router.push("/").then(() => window.scrollTo(0, 0));
  };

  return (
    <div className="container-menu-mobile-all">
      <div className="app-bar-container"></div>
      {isUserLogged ? (
        <div style={{ display: "flex", alignItems: "center"  }}>
          <AccountImg />
          <span style={{marginLeft:"5px"}}>Bienvenido!</span>
        </div>
      ) : (
        <div className="title-dropdown-avatar-home">
          <span style={{ fontSize: "13px" }}>
            <strong>Hola</strong>, Inicia tu sesion
          </span>
          <span style={{ fontSize: "13px" }} className="ingresa-registrate">
            <Link href="/login" passHref>
              <a
                onClick={() => {
                  setOpen(false);
                }}
              >
                {" "}
                Ingresá | Registrate
              </a>
            </Link>
          </span>
        </div>
      )}
      <Divider />
      <div style={{ display: "flex" }}>
        <AiOutlineHome />
        <Link href="/" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Inicio
          </span>
        </Link>
      </div>

      <Divider />
      {isUserLogged && (
        <>
          <div style={{ display: "flex" }}>
            <AiOutlineUser />
            <Link href="/perfil" passHref>
              <span
                className="span-item-menu-display"
                onClick={() => setOpen(false)}
                style={{ marginLeft: "5px" }}
              >
                Mis datos
              </span>
            </Link>
          </div>

          <Divider />
          {userType == 6 ? (
            <>
              <Link href="/miscompras" passHref>
                <span
                  className="span-item-menu-display"
                  onClick={() => setOpen(false)}
                >
                  Mis compras
                </span>
              </Link>
              <Divider />
            </>
          ) : null}
        </>
      )}
      <div style={{ display: "flex" }}>
        <AiOutlineLike />
        <Link href="/favoritos" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Mis favoritos
          </span>
        </Link>
      </div>

      <Divider />
      <Collapsible
        trigger={
          <div
            data-testid="openHelpContactInfo"
            onClick={() => setOpenBrand(!openBrand)}
          >
            <div className="title-contain-row title-categoria-display-menu">
              <BiCategory />
              <span
                className="span-item-menu-display"
                style={{ marginLeft: "5px" }}
              >
                Categoria
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                color="#3D424D"
                width="20"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: "auto" }}
              >
                <polyline
                  data-testid="arrow"
                  points={!openBrand ? "6 9 12 15 18 9" : "18 15 12 9 6 15"}
                ></polyline>
              </svg>
            </div>
          </div>
        }
        open={openBrand}
      >
        <div style={{ marginLeft: "10px" }}>
          <Divider />
          <Link href="/productos?category=2" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Muebles
            </span>
          </Link>
          <Divider />
          <Link href="/productos?category=1" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Griferías
            </span>
          </Link>
          <Divider />
          <Link href="/productos?category=4" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Sanitarios
            </span>
          </Link>
          <Divider />
          <Link href="/productos?category=3" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Bachas
            </span>
          </Link>
          <Divider />
          <Link href="/productos?category=6" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Electro
            </span>
          </Link>
          <Divider />
          <Link href="/productos?category=7" passHref>
            <span
              className="span-item-menu-display"
              onClick={() => setOpen(false)}
            >
              Aberturas
            </span>
          </Link>
        </div>
      </Collapsible>
      <Divider />
      <div style={{ display: "flex" }}>
        <AiOutlineInfoCircle />
        <Link href="/preguntas-frecuentes" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Preguntas frecuentes
          </span>
        </Link>
      </div>

      <Divider />
      <div style={{ display: "flex" }}>
        <AiOutlineCompass />
        <Link href="/" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Quienes somos
          </span>
        </Link>
      </div>

      <Divider />
      <div style={{ display: "flex" }}>
        <MdOutlineSell />
        <Link href="/onboarding" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Quiero ser vendedor
          </span>
        </Link>
      </div>
      <Divider />
      <div style={{ display: "flex" }}>
        <AiOutlineContacts />
        <Link href="/" passHref>
          <span
            className="span-item-menu-display"
            onClick={() => setOpen(false)}
            style={{ marginLeft: "5px" }}
          >
            Contacto
          </span>
        </Link>
      </div>

      <Divider />
      {isUserLogged && (
        <>
          <div style={{ display: "flex" }}>
            <AiOutlineLogout />
            <span
              className="span-item-menu-display"
              onClick={onLogout}
              style={{ marginLeft: "5px" }}
            >
              Cerrar sesion
            </span>
          </div>
          <Divider />
        </>
      )}
    </div>
  );
};

ContainerDisplayMenu.propTypes = {
  // itemsQty: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userCompleteName: PropTypes.string.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
  authToken: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // itemsQty: selectCartItemsQty,
  username: selectUsername,
  userCompleteName: selectUserCompleteName,
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
  authToken: selectUserToken,
  isSuperSeller: selectIsSuperSeller,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContainerDisplayMenu);
