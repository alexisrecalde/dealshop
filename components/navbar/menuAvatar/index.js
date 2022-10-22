import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { Avatar } from "primereact/avatar";
import {
  selectIsUserLogged,
  selectUserType,
} from "../../../redux/user/user.selector";
import AccountImg from "../avatar/accountImg";

const MenuAvatar = ({
  iniciales,
  fullName,
  userType,
  onLogout,
  setAnchorEl,
  isUserLogged,
}) => {
  const router = useRouter();

  const goToMyProfile = () => {
    setAnchorEl(false);
    router.push("/perfil").then(() => window.scrollTo(0, 0));
  };

  const goToMyCompras = () => {
    setAnchorEl(false);
    router.push("/miscompras").then(() => window.scrollTo(0, 0));
  };

  const goToFavoritos = () => {
    setAnchorEl(false);
    router.push("/favoritos").then(() => window.scrollTo(0, 0));
  };

  const toPreguntasFrecuentes = () => {
    setAnchorEl(false);
    router.push("/preguntas-frecuentes").then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <div class="menu-container">
        <ul class="user-menu">
          <div class="profile-highlight">
            {isUserLogged ? (
              <AccountImg />
            ) : (
              <div className="title-dropdown-avatar-home">
                <span style={{ fontSize: "13px" }}>
                  <strong>Hola</strong>, Inicia tu sesion
                </span>
                <span
                  style={{ fontSize: "13px" }}
                  className="ingresa-registrate"
                >
                  <Link href="/login" passHref>
                    <a> Ingresá | Registrate</a>
                  </Link>
                </span>
              </div>
            )}
            <div class="details">
              {isUserLogged && (
                <div id="profile-name" style={{ textTransform: "capitalize" }}>
                  {fullName.toLowerCase()}
                </div>
              )}
              <div id="profile-footer" style={{ color: "#2fb670" }}>
                {userType == 1
                  ? "Super-Adm"
                  : userType == 2
                  ? "Administrador"
                  : userType == 3
                  ? "Vendedor"
                  : userType == 4
                  ? "Deposito"
                  : userType == 5
                  ? "Repartidor"
                  : ""}
              </div>
            </div>
          </div>
          {isUserLogged && (
            <li class="user-menu__item">
              <div class="user-menu-link" href="#" onClick={goToMyProfile}>
                <i className="pi pi-user" />
                <div>Mis datos</div>
              </div>
            </li>
          )}
          {isUserLogged && userType == 6 ? (
            <li class="user-menu__item">
              <div class="user-menu-link" href="#" onClick={goToMyCompras}>
                <i className="pi pi-tag" />
                <div>Mis compras</div>
              </div>
            </li>
          ) : null}
          <li class="user-menu__item">
            <div class="user-menu-link" href="#" onClick={goToFavoritos}>
              <i className="pi pi-heart" />
              <div>Mis favoritos</div>
            </div>
          </li>
          <li class="user-menu__item">
            <div
              class="user-menu-link"
              href="#"
              onClick={toPreguntasFrecuentes}
            >
              <i className="pi pi-info-circle" />
              <div>Preguntas frecuentes</div>
            </div>
          </li>
          {isUserLogged && (
            <li class="user-menu__item">
              <div class="user-menu-link" href="#" onClick={onLogout}>
                <i className="pi pi-sign-out" style={{ color: "red" }} />
                <div style={{ color: "red" }}>Cerrar Sesion</div>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

MenuAvatar.propTypes = {
  itemsQty: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  userCompleteName: PropTypes.string.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
  signOut: PropTypes.func.isRequired,
  authToken: PropTypes.string,
  updateUserData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MenuAvatar);
