import { Fragment, useState } from "react";
import Link from "next/link";
import getConfig from "next/config";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import PropTypes from "prop-types";
import { useRouter } from "next/router";

import { addItemToCart } from "../../../redux/cart/cart.actions";
import {
  selectIsUserLogged,
  selectUserType,
} from "../../../redux/user/user.selector";
import {
  ItemCard,
  ItemPrice,
  ItemTitle,
  ItemAvailability,
  ItemImageContainer,
  ItemImage,
  ItemAddContainer,
  ItemAmountContainer,
  ItemQtyInput,
} from "./itemCard.styles";
import { CurrencyText } from "../../../utils/number.utils";
import CustomButtonComponent from "../../customButton/customButton.component";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ItemCardComponent = ({ product, isUserLogged, addItemToCart, userType }) => {
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
  const [getAmount, setAmount] = useState(0);

  const onAddToCartClick = () => {
    setShow(true);
    setAmount(1);
  };

  const onInputChange = (event) => {
    event.preventDefault();
    let quantity = parseInt(event.target.value);

    if (quantity > availableQuantity) {
      quantity = availableQuantity;
    }

    setAmount(quantity);
  };

  const onPlusItem = () => {
    const quantity = getAmount + 1;

    if (quantity <= availableQuantity) {
      setAmount(quantity);
    }
  };

  const onMinusItem = () => {
    const quantity = getAmount == 1 ? 1 : getAmount - 1;

    setAmount(quantity);
  };

  const onConfirmItem = (item) => {
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
        position: "bottom-left",
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
    <ItemCard>
      <Link href={`/productos/${id}`} passHref>
        <ItemImageContainer style={{ cursor: "pointer" }}>
          <ItemImage
            alt={`Foto del producto ${name}`}
            src={
              photos.length < 1
                ? "/img/no-image.png"
                : `${publicRuntimeConfig.images_backend_url}${photos[0].image}`
            }
          />
        </ItemImageContainer>
      </Link>
      {isUserLogged ? (
        <ItemPrice>
          <CurrencyText value={suggestedPrice} />
        </ItemPrice>
      ) : (
        <div></div>
      )}
      <ItemTitle>
        {name.length > 50 ? name.substr(0, 47) + "..." : name}
      </ItemTitle>
      <Fragment>
        {availableQuantity > 0 ? (
          <ItemAvailability>
            Quedan {availableQuantity} unidades disponibles!
          </ItemAvailability>
        ) : (
          <ItemAvailability style={{ fontWeight: "bold", fontSize: "12px" }}>
            Sin stock por el momento
          </ItemAvailability>
        )}
      </Fragment>
      {getShow ? (
        <ItemAddContainer>
          <ItemAmountContainer>
            <MdKeyboardArrowLeft
              onClick={onMinusItem}
              style={{ fontSize: "1.6rem", cursor: "pointer" }}
            />
            <ItemQtyInput
              type="number"
              onChange={(event) => onInputChange(event)}
              value={getAmount}
            />
            <MdKeyboardArrowRight
              onClick={onPlusItem}
              style={{ fontSize: "1.6rem", cursor: "pointer" }}
            />
          </ItemAmountContainer>
          <CustomButtonComponent
            onClick={() => onConfirmItem(product)}
            color="secondary"
            style={{ cursor: "pointer", borderRadius: "15px", height: "30px" }}
          >
            Confirmar
          </CustomButtonComponent>
        </ItemAddContainer>
      ) : isUserLogged && availableQuantity > 0 ? (
        <CustomButtonComponent
          onClick={onAddToCartClick}
          color="secondary"
          style={{ cursor: "pointer", borderRadius: "15px", height: "30px" }}
        >
          Agregar al carrito
        </CustomButtonComponent>
      ) : (
        <CustomButtonComponent
          onClick={() =>
            router.push(`/productos/${id}`).then(() => window.scrollTo(0, 0))
          }
          color="secondary"
          style={{ cursor: "pointer", borderRadius: "15px", height: "30px" }}
        >
          Ver detalle
        </CustomButtonComponent>
      )}
    </ItemCard>
  );
};

ItemCardComponent.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemCardComponent);
