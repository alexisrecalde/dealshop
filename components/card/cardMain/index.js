import { useEffect, useState } from "react";
import Link from "next/link";
import getConfig from "next/config";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Rating } from "primereact/rating";
import { addItemToCart } from "../../../redux/cart/cart.actions";
import {
  selectIsUserLogged,
  selectUserType,
} from "../../../redux/user/user.selector";
import { CurrencyText } from "../../../utils/number.utils";
import CustomButtonComponent from "../../customButton/customButton.component";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { InputText } from "../../input/input.styles";

const CardMain = ({
  product,
  megusta,
  addItemToCart,
  color,
  isUserLogged,
  userType,
}) => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const {
    id,
    name,
    suggestedPrice,
    photos,
    mainBranchQuantity,
    secondaryBranchQuantity,
  } = product;
  const availableQuantity = mainBranchQuantity + secondaryBranchQuantity;
  const [getShow, setShow] = useState(false);
  // const [getAmount, setAmount] = useState(0);
  const [getAmount, setAmount] = useState(1);
  const [fav, setFav] = useState(false);
  const getArray = JSON.parse(localStorage.getItem("favoritos") || "0");

  useEffect(() => {
    const putLike = () => {
      if (getArray !== 0) {
        getArray.map((el) => {
          if (el.id === product.id) {
            setFav(true);
          }
        });
      }
    };
    putLike();
  }, []);

  const onAddToCartClick = (e) => {
    // e.preventDefault();
    // setShow(true);
    setAmount(1);
  };

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

  let indice = product.name.toLowerCase().split(" ");

  const onInputChange = (event) => {
    event.preventDefault();
    let quantity = parseInt(event.target.value);

    if (quantity > availableQuantity) {
      quantity = availableQuantity;
    }

    setAmount(quantity);
  };

  const onPlusItem = (e) => {
    e.preventDefault();
    const quantity = getAmount + 1;

    if (quantity <= availableQuantity) {
      setAmount(quantity);
    }
  };

  const onMinusItem = (e) => {
    e.preventDefault();
    const quantity = getAmount == 1 ? 1 : getAmount - 1;

    setAmount(quantity);
  };

  const onConfirmItem = (item) => {
    setAmount(1);
    item.quantity = getAmount;
    item.clientSellingPrice = item.suggestedPrice;

    addItemToCart(item);
    setShow(false);
    setAmount(0);

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

  return (
    <motion.div
      className="card-main"
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <div
        className="favorito-corazon"
        onClick={() => {
          megusta(product);
          setFav(!fav);
        }}
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
      {/* <Link href={`/productos/${id}`} passHref>
        <a> */}
      <div className="container-inside">
        <div
          style={{ cursor: "pointer", backgroundColor: color }}
          className="container-image-card"
        >
          <img
            alt={`Foto del producto ${name}`}
            src={`https://www.dealshop.com.ar/images${product.photos[0].image}`}
          />
        </div>
        <div className="info-card-product">
          <div className="title-card-product">
            {indice.length > 4
              ? `${indice[0]} ${indice[1]} ${indice[3]} ${indice[4]}...`
              : product.name.toLowerCase()}
          </div>
          {/* <div className="description-card-product">
              {product.description}{" "}
            </div> */}
          {isUserLogged && (
            <div className="price-card-product">
              <span className="price-new">
                <CurrencyText value={product.suggestedPrice} />
              </span>
            </div>
          )}

          <div className="cantidad-disponible-main">
            {availableQuantity == 0
              ? `Sin stock por el momento`
              : `Quedan disponibles ${availableQuantity}!`}
          </div>

          <button
            className="button-agregar-carrito-items"
            style={{ cursor: "pointer" }}
          >
            {/* {getShow &
                <div className="" onClick={onAddToCartClick}>
                  Agregar a carrito
                </div>
              } */}
            {!isUserLogged ? (
              // <div>
              //   <div>
              //     <MdKeyboardArrowLeft
              //       onClick={(e) => onMinusItem(e)}
              //       style={{ fontSize: "1.6rem", cursor: "pointer" }}
              //     />
              //     <InputText
              //       type="number"
              //       onChange={(event) => onInputChange(event)}
              //       value={getAmount}
              //     />
              //     <MdKeyboardArrowRight
              //       onClick={(e) => onPlusItem(e)}
              //       style={{ fontSize: "1.6rem", cursor: "pointer" }}
              //     />
              //   </div>
              //   <div
              //     onClick={() => onConfirmItem(product)}
              //     color="secondary"
              //     style={{
              //       cursor: "pointer",
              //       borderRadius: "15px",
              //       height: "30px",
              //     }}
              //   >
              //     Confirmar
              //   </div>
              // </div>
              <div
                onClick={() =>
                  router
                    .push(`/productos/${id}`)
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
            ) : isUserLogged && availableQuantity > 0 ? (
              <div
                onClick={() => onAddToCart(product)}
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
            ) : (
              <div
                onClick={() =>
                  router
                    .push(`/productos/${id}`)
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
            )}
          </button>
          {/* <div className="shipping-card-product">Destacado</div> */}
        </div>
      </div>
      {/* </a>
      </Link> */}
    </motion.div>
  );
};

CardMain.propTypes = {
  isUserLogged: PropTypes.bool.isRequired,
  addItemToCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isUserLogged: selectIsUserLogged,
  userType: selectUserType,
});

const mapDispatchToProps = (dispatch) => ({
  addItemToCart: (item) => dispatch(addItemToCart(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMain);
