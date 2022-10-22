import React, { useState, useRef, useEffect } from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import getConfig from "next/config";
import { Rating } from "primereact/rating";
import { CurrencyText } from "../../../utils/number.utils";
import { Tag } from "primereact/tag";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import ShareModal from "../../shareModal";
import PropTypes from "prop-types";
import { addItemToCart } from "../../../redux/cart/cart.actions";
import {
  selectIsUserLogged,
  selectUserType,
} from "../../../redux/user/user.selector";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ItemAddContainer,
  ItemAmountContainer,
  ItemQtyInput,
} from "../../../components/card/itemCard/itemCard.styles";
import ModalMenorCantidad from "../../itemDetail/modalMenorCantidad";
import CustomButtonComponent from "../../customButton/customButton.component";
import { useRouter } from "next/router";
// import ModalShare from "../modalShare";

const ItemSearch = ({
  data,
  fromDetails,
  megusta,
  isUserLogged,
  userType,
  addItemToCart,
  limitHour,
  fromCarousel,
  fromFavoritos,
  deleteFav,
}) => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();
  const [fav, setFav] = useState();
  const [getQty, setQty] = useState(1);
  const [showModalShare, setShowModalShare] = useState(false);
  const [show, setShow] = useState(true);
  const [getAmount, setAmount] = useState(1);
  const [mobileView, setMobileView] = useState(false);
  const [showMenorCantidad, setShowMenorCantidad] = useState(false);
  const { mainBranchQuantity, secondaryBranchQuantity } = data;
  const availableQuantity = mainBranchQuantity + secondaryBranchQuantity;
  const getArray = JSON.parse(localStorage.getItem("favoritos") || "0");
  const toastCopy = useRef(null);
  console.log(data);
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
    const putLike = () => {
      if (getArray !== 0) {
        getArray.map((el) => {
          if (el.id === data.id) {
            setFav(true);
          }
        });
      }
    };
    putLike();
  }, []);

  setTimeout(() => setShow(false), 800);

  const onAddToCart = (item) => {
    item.quantity = getAmount;
    item.clientSellingPrice = item.suggestedPrice;

    addItemToCart(item);

    toast.info(
      <div>
        <h4>{`🎉 Se agregó ${item.quantity} ${item.name} al carrito.`}</h4>
        <CustomButtonComponent
          style={{ width: "100%", height: "35px" }}
          onClick={() => {
            if (userType == 6) {
              router.push("/cart").then(() => window.scrollTo(0, 0));
            } else {
              router.push("/carrito").then(() => window.scrollTo(0, 0));
            }
          }}
        >
          Ir al carrito
        </CustomButtonComponent>
      </div>,
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const onAddToCartClick = (item) => {
    if (availableQuantity == 0) {
      setShowMenorCantidad(true);
    } else {
      item.quantity = getQty;
      item.clientSellingPrice = item.suggestedPrice;
      addItemToCart(item);
      setQty(1);

      toast.info(`🎉 Se agregó ${item.quantity} ${item.name} al carrito.`, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let dataCreationDateMonth = data.dateCreated.slice(0, 7);

  const skeleton = () => {
    return (
      <>
        <div
          className={`${fromCarousel && "skeleton-carousel"} skeleton`}
          skeleton
          style={{ border: "1px solid #dee2e6" }}
        >
          <div className="">
            <div className="custom-skeleton p-4">
              <Skeleton
                width="300px"
                height="300px"
                className="skeleton-img"
              ></Skeleton>
              <div className="flex mt-3">
                <div>
                  <Skeleton width="10rem" className="mb-2"></Skeleton>
                  <Skeleton width="5rem" className="mb-2"></Skeleton>
                  <Skeleton height=".5rem"></Skeleton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      {show && skeleton()}
      {!show && (
        <>
          <div
            className={`${
              (fromCarousel && "product-carousel") ||
              (fromFavoritos && "card-favoritos-container")
            } product-grid-item card `}
          >
            <div
              className="favorito-corazon"
              onClick={() => {
                megusta(data);
                setFav(!fav);
              }}
              style={{ zIndex: "9999999 !important" }}
            >
              <div className="contenedor-me-gusta">
                <i
                  className={
                    fav
                      ? "i-megusta press-i pi pi-heart-fill"
                      : "i-megusta pi pi-heart"
                  }
                ></i>
              </div>
            </div>
            {dataCreationDateMonth === "2022-02" && (
              <div
                className="tag-nuevo"
                style={{ zIndex: "9999999 !important" }}
              >
                <Tag className="mr-2" value="Nuevo"></Tag>
              </div>
            )}
            {mobileView ? null : (
              <>
                {" "}
                {/* {isUserLogged ? (
                  userType === 6 ? (
                    <div
                      onClick={() => onAddToCartClick(data)}
                      class="add-to-cart"
                    >
                      Agregar a carrito
                    </div>
                  ) : availableQuantity > 0 ? (
                    <>
                      <div className="cantidad-disponible">
                        Quedan disponibles {availableQuantity}
                      </div>

                      <div
                        onClick={() => onAddToCartClick(data)}
                        class="add-to-cart"
                      >
                        Agregar a carrito
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="cantidad-disponible">
                        Quedan disponibles {availableQuantity}
                      </div>

                      <div
                        // onClick={() => console.log("no hay")}
                        class="add-to-cart"
                        disabled
                      >
                        Agregar a carrito
                      </div>
                    </>
                  )
                ) : (
                  <div
                    onClick={() => onAddToCartClick(data)}
                    class="add-to-cart"
                  >
                    Agregar a carrito
                  </div>
                )} */}
              </>
            )}
            {mobileView ? null : (
              <div
                className="contenedor-me-gusta container-share-button"
                onClick={() => setShowModalShare(true)}
              >
                <i className="pi pi-share-alt i-share-button"></i>
              </div>
            )}

            <div
              className={`product-grid-item-content ${
                fromDetails ? "from-details" : ""
              }`}
            >
              <img
                src={
                  data.photos.length > 0
                    ? `${publicRuntimeConfig.images_backend_url}${data.photos[0].image}`
                    : "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
                }
                onError={(e) =>
                  (e.target.src =
                    "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                }
                alt={data.name}
                style={{ cursor: "pointer" }}
              />
              {/* </Link> */}
              {isUserLogged && (
                <div className="price-item-search">
                  <span className="span-1">
                    <CurrencyText value={data.suggestedPrice} />
                  </span>
                  <span className="span-2">
                    <CurrencyText value={data.sellingPrice} />
                  </span>
                </div>
              )}
              {/* <div className="stars-product-item-search">
                <Rating value={data.stars} readOnly cancel={false}></Rating>
              </div> */}

              {data.shippingType !== "camioneta" && availableQuantity > 0 ? (
                limitHour > 17 ? (
                  <div className="llega-hoy-chip llega-hoy-chip-absolute">
                    Llega mañana
                  </div>
                ) : (
                  <div className="llega-hoy-chip llega-hoy-chip-absolute">
                    Llega hoy
                  </div>
                )
              ) : null}

              <Link href={`/productos/${data.id}`} passHref>
                <div
                  className={
                    fromFavoritos ? "product-name-favoritos" : "product-name"
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  {data.name.length > 50
                    ? data.name.substr(0, 50) + "..."
                    : data.name}
                </div>
              </Link>
              {!isUserLogged ? (
                <button
                  className="button-agregar-carrito-items"
                  style={{ cursor: "pointer", bottom: "40px" }}
                >
                  <div
                    onClick={() =>
                      router
                        .push(`/productos/${data.id}`)
                        .then(() => window.scrollTo(0, 0))
                    }
                    color="secondary"
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 5px",
                    }}
                  >
                    Ver detalle
                  </div>
                </button>
              ) : isUserLogged && availableQuantity > 0 ? (
                <button
                  className={`${
                    fromFavoritos && "button-agregar-carrito-favorito"
                  } button-agregar-carrito-items`}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    onClick={() => onAddToCart(data)}
                    color="secondary"
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 5px",
                    }}
                  >
                    Agregar al carrito
                  </div>
                </button>
              ) : (
                <button
                  className={`${
                    fromFavoritos && "button-agregar-carrito-favorito"
                  } button-agregar-carrito-items`}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    onClick={() =>
                      router
                        .push(`/productos/${data.id}`)
                        .then(() => window.scrollTo(0, 0))
                    }
                    color="secondary"
                    style={{
                      cursor: "pointer",
                      borderRadius: "15px",
                      height: "30px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "0 5px",
                    }}
                  >
                    Ver mas
                  </div>
                </button>
              )}
              {fromFavoritos && (
                <div
                  className="delete-favorito"
                  onClick={() => deleteFav(data.id)}
                >
                  Eliminar
                </div>
              )}
              {isUserLogged && !fromCarousel && (
                <div
                  className={
                    fromFavoritos
                      ? "cantidad-disponible-favoritos"
                      : "cantidad-disponible"
                  }
                  style={{ bottom: "15px" }}
                >
                  {availableQuantity == 0
                    ? `Sin stock por el momento`
                    : `Quedan disponibles ${availableQuantity}!`}
                </div>
              )}
            </div>
            {/* </Link> */}
          </div>
          <ShareModal
            setShowModalShare={setShowModalShare}
            showModalShare={showModalShare}
            item={data}
            toast={toastCopy}
            // actionBar={true}
            // show={showToast}
          />
          <ModalMenorCantidad
            setShowMenorCantidad={setShowMenorCantidad}
            showMenorCantidad={showMenorCantidad}
            item={data}
          ></ModalMenorCantidad>
        </>
      )}
    </>
  );
};

ItemSearch.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  userType: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemSearch);
