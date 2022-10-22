import { connect } from "react-redux";
import getConfig from "next/config";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";

import TableComponent from "../table.component";
import { selectCartItems } from "../../../redux/cart/cart.selector";
import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { InputValue } from "../table.styles";
import { CurrencyInput, CurrencyText } from "../../../utils/number.utils";
import { FaChevronLeft, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import {
  clearItemFromCart,
  reduceItemFromCart,
  increaseItemFromCart,
  setSellingPrice,
} from "../../../redux/cart/cart.actions";
import { selectIsSubSeller } from "../../../redux/user/user.selector";

const CartTableComponent = ({
  cartItems,
  isSubSeller,
  clearItemFromCart,
  reduceItemFromCart,
  increaseItemFromCart,
  setSellingPrice,
}) => {
  const { publicRuntimeConfig } = getConfig();
  const commissionMultiplier = isSubSeller ? 0.8 : 1;

  const onChangeValue = (e, item) => {
    e.preventDefault();
    let value = e.target.value.replace(/,/g, "");

    if (value == "" || value == null) {
      value = item.suggestedPrice;
    }

    value = parseFloat(value);

    if (value < item.sellingPrice) {
      toast.error(
        `❌ El valor $${value} es menor al costo del producto ($${item.sellingPrice}). Se asignó el precio de venta sugerido.`,
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
      item.clientSellingPrice = item.suggestedPrice;
    } else {
      item.clientSellingPrice = value;
    }

    setSellingPrice(item);
  };

  const arrayOfColumns = [
    { id: 1, name: "Producto" },
    { id: 2, name: "" },
    { id: 3, name: "Cantidad" },
    // { id: 4, name: 'Costo producto' },
    { id: 4, name: "Comisión" },
    { id: 5, name: "Precio sugerido de venta" },
    { id: 6, name: "Precio de venta" },
    { id: 7, name: "Acciones" },
  ];

  const arrayOfItems = cartItems.map((item) => {
    return {
      imagen: (
        <img
          src={
            item.photos
              ? item.photos.length < 1
                ? "/img/no-image.png"
                : `${publicRuntimeConfig.images_backend_url}${item.photos[0].image}`
              : "/img/no-image.png"
          }
          alt="Imagen del producto"
          style={{ maxHeight: "65px" }}
        />
      ),
      name: item.name,
      quantity: (
        <div style={{ display: "inline-flex" }}>
          <FaChevronLeft
            onClick={() => reduceItemFromCart(item)}
            style={{ fontSize: "1.4rem", cursor: "pointer", color: "#e91e63" }}
          />
          <label>{item.quantity}</label>
          <FaChevronRight
            onClick={() => increaseItemFromCart(item)}
            style={{ fontSize: "1.4rem", cursor: "pointer", color: "#e91e63" }}
          />
        </div>
      ),
      // precio_costo: <CurrencyText value={item.sellingPrice} />,
      comision: (
        <CurrencyText
          value={
            (item.clientSellingPrice - item.sellingPrice) * commissionMultiplier
          }
        />
      ),
      precio_sugerido: <CurrencyText value={item.suggestedPrice} />,
      precio_venta: (
        <InputValue
          onBlur={(e) => onChangeValue(e, item)}
          placeholder={item.clientSellingPrice.toString()}
          style={{ minWidth: "5rem" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            inputComponent: CurrencyInput,
          }}
        />
      ),
      eliminar: (
        <FaTrashAlt
          style={{ cursor: "pointer", fontSize: "1.5rem", color: "#e91e63" }}
          onClick={() => clearItemFromCart(item)}
        />
      ),
    };
  });

  return <TableComponent columns={arrayOfColumns} rows={arrayOfItems} />;
};

CartTableComponent.propTypes = {
  cartItems: PropTypes.array.isRequired,
  isSubSeller: PropTypes.bool.isRequired,
  clearItemFromCart: PropTypes.func.isRequired,
  reduceItemFromCart: PropTypes.func.isRequired,
  increaseItemFromCart: PropTypes.func.isRequired,
  setSellingPrice: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  isSubSeller: selectIsSubSeller,
});

const mapDispatchToProps = (dispatch) => ({
  clearItemFromCart: (item) => dispatch(clearItemFromCart(item)),
  reduceItemFromCart: (item) => dispatch(reduceItemFromCart(item)),
  increaseItemFromCart: (item) => dispatch(increaseItemFromCart(item)),
  setSellingPrice: (item) => dispatch(setSellingPrice(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartTableComponent);
