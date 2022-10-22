import React from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { selectIsUserLogged, selectUserType } from "../../../redux/user/user.selector";
import { selectCartItemsQty } from "../../../redux/cart/cart.selector";
import { Badge } from "primereact/badge";
import { createStructuredSelector } from "reselect";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IconContainer } from "../navbar.style";
import AccountImg from "./accountImg";

const AvatarContainer = ({
  anchorEl,
  setAnchorEl,
  userCompleteNa,
  itemsQty,
  isUserLogged,
  userType,
}) => {
  const router = useRouter();

  const goToFavoritos = () => {
    router.push("/favoritos").then(() => window.scrollTo(0, 0));
  };

  return (
    <>
      <div
        className="container-avatar-user"
        style={{
          alignItems: "center",
          justifyContent: "space-evenly",
          height: "45px",
          backgroudColor: "transparent !important",
        }}
        color="secondary"
        onClick={() => setAnchorEl(!anchorEl)}
      >
        <AccountImg />
        <div className="container-login-title">
          {isUserLogged ? (
            <>
              <div className="login-account-title">Hola</div>
              <div className="login-account-title title-name">
                {userCompleteNa}
              </div>
            </>
          ) : (
            <div className="login-account-title title-name">Mi cuenta</div>
          )}
        </div>

        <IconContainer>
          {anchorEl ? (
            <FaAngleUp style={{ fontSize: "1.1rem" }} />
          ) : (
            <FaAngleDown style={{ fontSize: "1.1rem" }} />
          )}
        </IconContainer>
      </div>
      <div
        className="container-cart-wallet"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          // width: 160px;
          marginLeft: "auto",
        }}
      >
        <i
          className="fa fa-solid fa-heart p-text-secondary p-overlay-badge heart-favoritos-menu-avatar"
          style={{
            fontSize: "1.2rem",
            color: "red",
            cursor: "pointer",
            marginRight: "20px",
            marginLeft: "20px",
          }}
          onClick={goToFavoritos}
        ></i>
        {isUserLogged ? (
          userType === 6 ? (
            <>
              <Link href="/cart" passHref>
                <a>
                  <i
                    className="pi pi-shopping-cart p-text-secondary p-overlay-badge"
                    style={{
                      fontSize: "1.2rem",
                      color: "#e91e63",
                      cursor: "pointer",
                    }}
                  >
                    {itemsQty ? (
                      <Badge
                        value={itemsQty}
                        severity="danger"
                        size="small"
                        style={{ width: "auto", fontSize: "10px" }}
                      ></Badge>
                    ) : null}
                  </i>
                </a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/carrito" passHref>
                <a>
                  <i
                    className="pi pi-shopping-cart p-text-secondary p-overlay-badge"
                    style={{
                      fontSize: "1.2rem",
                      color: "#e91e63",
                      cursor: "pointer",
                    }}
                  >
                    {itemsQty ? (
                      <Badge
                        value={itemsQty}
                        severity="danger"
                        size="small"
                        style={{ width: "auto", fontSize: "10px" }}
                      ></Badge>
                    ) : null}
                  </i>
                </a>
              </Link>
            </>
          )
        ) : (
          <>
            <Link href="/cart" passHref>
              <a>
                <i
                  className="pi pi-shopping-cart p-text-secondary p-overlay-badge"
                  style={{
                    fontSize: "1.2rem",
                    color: "#e91e63",
                    cursor: "pointer",
                  }}
                ></i>
              </a>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

AvatarContainer.propTypes = {
  itemsQty: PropTypes.number.isRequired,
  isUserLogged: PropTypes.bool.isRequired,
  userType: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  itemsQty: selectCartItemsQty,
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
});

export default connect(mapStateToProps)(AvatarContainer);
