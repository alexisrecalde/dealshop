import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import Link from "next/link";
// import AppBar from "@mui/material/AppBar";
import ActionbarComponent from "./actionbar/actionbar.component";
import MenuItem from "@mui/material/MenuItem";
import { motion, useCycle } from "framer-motion";
import { selectCartItemsQty } from "../../redux/cart/cart.selector";
import {
  selectIsSuperSeller,
  selectIsUserLogged,
  selectUsername,
  selectUserCompleteName,
  selectUserToken,
  selectUserType,
  selectUser,
} from "../../redux/user/user.selector";
import { Button } from "primereact/button";
import { signOutUser, updateUserData } from "../../redux/user/user.actions";
import { getCity, verifyUser } from "../../queries/users/users.queries";
import { Avatar } from "primereact/avatar";
import { Divider } from "primereact/divider";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { Card } from "primereact/card";
import { Tooltip } from "primereact/tooltip";
import {
  MenuContainer,
  CartContainer,
  ItemCount,
  IconContainer,
} from "./navbar.style";
import CustomButtonComponent from "../customButton/customButton.component";
import { ImSearch } from "react-icons/im";
import { FaShoppingCart, FaUser, FaAngleDown, FaAngleUp } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import getConfig from "next/config";
import axios from "axios";
import MenuAvatar from "./menuAvatar";
import SearchInputMobile from "./searchInputMobile";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineWatchLater } from "react-icons/md";
import MegaMenu from "./megaMenu";
import MenuMega from "./menuMega";
import AvatarContainer from "./avatar";
import AccountImg from "./avatar/accountImg";

const NavbarComponent = ({
  signOut,
  updateUserData,
  user,
  username,
  userCompleteName,
  isUserLogged,
  userType,
  authToken,
  isSuperSeller,
  setOpen,
  open,
  setOpenSearchSide,
  openSearchSide,
  setLastSearch,
  lastSearch,
}) => {
  const router = useRouter();
  const [mobileView, setMobileView] = useState(false);
  const [getKeyword, setKeyword] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [dropDownSearch, setDropDownSearch] = useState(false);
  const [prod, setProd] = useState();
  const { publicRuntimeConfig } = getConfig();
  const [iniciales, setIniciales] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showProductOptions, setShowProductOptions] = useState(false);
  const [userLocation, setUserLocation] = useState();

  const config = {
    headers: {
      "x-client-id": "6eb59dd2-7a48-4a13-9110-b78c56a3f861",
      "content-type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "x-auth-token":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWFpbCI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJPw7FhIiwicGhvbmUiOjQ0MTI2Mzc0LCJkbmkiOjM3Njc3MjEyLCJpc0VuYWJsZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMDFUMDE6MzA6MjIuMzIyWiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6bnVsbCwiaWF0IjoxNjA5NjE0OTkxfQ._I8a3D3VDewI-gSCIh72IgOkPCUUbvhkSr_JxC71Hg0",
    },
  };

  useEffect(() => {
    const getProd = async () => {
      const url = `${publicRuntimeConfig.backend_url}/public/search-products`;
      const { data } = await axios.get(url, config);
      setProd(data.products.results);
    };

    getProd();
  }, []);

  useEffect(() => {
    const getPosition = () => {
      return new Promise((res, rej) => {
        console.log(res);
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    const main = () => {
      getPosition()
        .then((res) => {
          return res;
        })
        .then((response) => {
          var geocoder;
          geocoder = new google.maps.Geocoder();
          var latlng = new google.maps.LatLng(
            response.coords.latitude,
            response.coords.longitude
          );
          geocoder.geocode({ latLng: latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              if (results[0]) {
                const city = results[0].address_components[4].long_name;
                const localidad = results[0].address_components[2].long_name;
                setUserLocation(localidad);
              }
            }
          });
        });
    };
    main();
  }, []);

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
    if (getKeyword) {
      setDropDownSearch(true);
    } else if (getKeyword == "") {
      setDropDownSearch(false);
    } else {
      setDropDownSearch(false);
    }
  }, [getKeyword]);

  const handleClick = () => {
    setDropDownSearch(!dropDownSearch);
  };

  useEffect(() => {
    const verifyingUserStatus = async () => {
      try {
        const reponse = await verifyUser(authToken);
        if (reponse.data.dataUpdated) {
          const { user, token } = reponse.data;

          const userData = {
            token: token,
            userType: user.userTypeId,
            userTypeDesc: user.userType.description,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            dni: user.dni,
            isSuperSeller: user.isSuperSeller,
          };
          updateUserData(userData);
        }
      } catch (e) {
        signOut();
        setAnchorEl(null);
        router.push("/").then(() => window.scrollTo(0, 0));
      }
    };

    if (isUserLogged) {
      verifyingUserStatus();
    }
  }, []);

  useEffect(() => {
    const getInitial = () => {
      const inicialA = user.firstName.charAt(0);
      const inicialB = user.lastName.charAt(0);
      setIniciales(`${inicialA}${inicialB}`);
    };
    getInitial();
  }, []);

  const onSubmitSearch = (e) => {
    e.preventDefault();
    setDropDownSearch(false);
    if (getKeyword != "") {
      let arrayToCookie;
      if (lastSearch) {
        arrayToCookie = [...lastSearch];
        arrayToCookie.push(getKeyword);
        let unique = [...new Set(arrayToCookie)];

        let arrayToString = JSON.stringify(unique);
        setLastSearch("LAST_SEARCH", arrayToString);
      } else {
        setLastSearch("LAST_SEARCH", [getKeyword]);
      }

      router
        .push({ pathname: "/productos", query: { name: getKeyword } })
        .then(() => window.scrollTo(0, 0));
    }
  };

  const onLogout = () => {
    signOut();
    setAnchorEl(null);
    router.push("/").then(() => window.scrollTo(0, 0));
  };

  const goToMyProfile = () => {
    router.push("/perfil").then(() => window.scrollTo(0, 0));
  };

  const userCompleteNa = userCompleteName.toLowerCase();

  return (
    <div position="sticky" className="app-bar-container">
      <div className="app-bar-container-input-image">
        {mobileView ? (
          <>
            <GiHamburgerMenu
              style={{
                fontSize: "1.5rem",
                color: "#E91E63",
                marginRight: "10px",
              }}
              onClick={() => setOpen(!open)}
            />
          </>
        ) : null}
        <div style={{ width: "auto" }}>
          <Link href="/" passHref>
            <a className="logo_inicio">
              <img
                src="/img/Group 505.png"
                alt="logo dealshop"
                className="img-logo-nav-bar"
              />
              {!mobileView && <h1 variant="h1">DealShop</h1>}
            </a>
          </Link>
          {!mobileView && userLocation && (
            <span style={{ fontSize: "12px", marginTop: "10px" }}>
              <i
                className="pi pi-map-marker p-text-secondary p-overlay-badge"
                data-pr-position="right"
                style={{
                  fontSize: "1rem",
                  color: "rgb(136, 136, 136)",
                  cursor: "pointer",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              ></i>
              Estas en{" "}
              <b
                style={{
                  fontamily: '"Work Sans", sans-serif',
                  fontWeight: "300",
                  color: "rgb(0, 106, 253)",
                }}
              >
                {userLocation}
              </b>{" "}
            </span>
          )}
        </div>
        {mobileView ? null : (
          <form onSubmit={onSubmitSearch} style={{ position: "relative" }}>
            <input
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Buscar productos y más..."
              inputProps={{ "aria-label": "search" }}
              className="input-search"
              value={getKeyword}
            />
            <div
              onClick={onSubmitSearch}
              style={{ cursor: "pointer" }}
              className="icon-container-search"
            >
              <ImSearch style={{ color: "#fff" }} />
            </div>
            {getKeyword !== "" && dropDownSearch ? (
              <ClickAwayListener
                onClickAway={() => {
                  handleClick();
                }}
              >
                <Card
                  style={{
                    backgroundColor: "#ff",
                    marginTop: "10px",
                    position: "absolute",
                    width: "100%",
                    zIndex: "200",
                    overflowY: "hidden",
                    height: "auto",
                    borderRadius: "0px",
                    top: "50px",
                    left: "0px",
                  }}
                  className="card-dropdown-search"
                >
                  {lastSearch ? (
                    <>
                      <h4 style={{ marginTop: "0" }}>Último buscados</h4>
                      {lastSearch
                        .slice(lastSearch.length - 2, lastSearch.length)
                        .map((el) => {
                          return (
                            <>
                              <Link href={`/productos/?name=${el}`} passHref>
                                <div
                                  className="item-search-card-dropdown"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => setDropDownSearch(false)}
                                >
                                  <MdOutlineWatchLater className="pi pi-send i-share-button" />
                                  <div
                                    className=""
                                    style={{
                                      fontSize: "14px",
                                      marginLeft: "10px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    {el}
                                  </div>
                                </div>
                              </Link>
                              <Divider />
                            </>
                          );
                        })}
                    </>
                  ) : null}
                  <h4 style={{ marginTop: "0" }}>Resultados</h4>
                  {prod
                    .filter((data) => {
                      return (
                        data.name
                          .toLowerCase()
                          .search(getKeyword.toLowerCase()) != -1
                      );
                    })
                    .slice(0, 4)
                    .map((obj) => {
                      return (
                        <>
                          <Link href={`/productos/${obj.id}`} passHref>
                            <div
                              className="item-search-card-dropdown"
                              style={{ cursor: "pointer" }}
                              onClick={() => setDropDownSearch(false)}
                            >
                              <i className="pi pi-send i-share-button"></i>
                              <div
                                className=""
                                style={{ fontSize: "14px", marginLeft: "10px" }}
                              >
                                {obj.name}
                              </div>
                            </div>
                          </Link>
                          <Divider />
                        </>
                      );
                    })}
                </Card>
              </ClickAwayListener>
            ) : null}
          </form>
        )}
        {mobileView && (
          <>
            <div
              onClick={() => setOpenSearchSide(!openSearchSide)}
              style={{
                cursor: "pointer",
                marginLeft: "auto",
              }}
              className="icon-container"
            >
              <ImSearch style={{ color: "#E91E63", fontSize: "25px" }} />
            </div>
            {isUserLogged && (
              <div
                className="avatar-contain"
                onClick={() => {
                  goToMyProfile();
                }}
              >
                <AccountImg />
              </div>
            )}
          </>
        )}

        {isUserLogged ? (
          <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
            <div
              style={{
                position: "relative",
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AvatarContainer
                setAnchorEl={setAnchorEl}
                anchorEl={anchorEl}
                userCompleteNa={userCompleteNa}
              />
              {anchorEl ? (
                <MenuAvatar
                  iniciales={iniciales}
                  fullName={userCompleteNa}
                  userType={userType}
                  onLogout={onLogout}
                  setAnchorEl={setAnchorEl}
                />
              ) : null}
            </div>
          </ClickAwayListener>
        ) : (
          <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
            <div
              style={{
                position: "relative",
                width: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AvatarContainer setAnchorEl={setAnchorEl} anchorEl={anchorEl} />
              {anchorEl ? (
                <MenuAvatar
                  iniciales={iniciales}
                  fullName={userCompleteNa}
                  userType={userType}
                  onLogout={onLogout}
                  setAnchorEl={setAnchorEl}
                />
              ) : null}
            </div>
          </ClickAwayListener>
        )}
      </div>
      {mobileView && userLocation && (
        <div
          style={{
            fontSize: "12px",
            marginTop: "0px",
            paddingBottom: "10px",
            paddingLeft: "10px",
          }}
        >
          <i
            className="pi pi-map-marker p-text-secondary p-overlay-badge"
            data-pr-position="right"
            style={{
              fontSize: "1rem",
              color: "rgb(136, 136, 136)",
              cursor: "pointer",
              marginRight: "5px",
              marginLeft: "5px",
            }}
          ></i>
          Estas en{" "}
          <b
            style={{
              fontamily: '"Work Sans", sans-serif',
              fontWeight: "300",
              color: "rgb(0, 106, 253)",
            }}
          >
            {userLocation}
          </b>{" "}
        </div>
      )}
      <>
        <Divider style={{ margin: "0px" }} />
        <MegaMenu setShowProductOptions={setShowProductOptions} />
        <MenuMega
          showProductOptions={showProductOptions}
          setShowProductOptions={setShowProductOptions}
        />
      </>
      {isUserLogged && userType !== 6 ? (
        <ActionbarComponent userType={userType} isSuperSeller={isSuperSeller} />
      ) : (
        <Fragment />
      )}
    </div>
  );
};

NavbarComponent.propTypes = {
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
  itemsQty: selectCartItemsQty,
  username: selectUsername,
  userCompleteName: selectUserCompleteName,
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
  authToken: selectUserToken,
  isSuperSeller: selectIsSuperSeller,
  user: selectUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutUser()),
  updateUserData: (data) => dispatch(updateUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
