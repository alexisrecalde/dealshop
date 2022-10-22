import React from "react";
import { connect } from "react-redux";
import getConfig from "next/config";
import PropTypes from "prop-types";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../../redux/cart/cart.selector";
//import InputAdornment from "@mui/material/InputAdornment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { InputValue } from "../table.styles";
// import { CurrencyInput, CurrencyText } from "../../../utils/number.utils";
// import { FaChevronLeft, FaChevronRight, FaTrashAlt } from "react-icons/fa";
import {
  clearItemFromCart,
  reduceItemFromCart,
  increaseItemFromCart,
  setSellingPrice,
} from "../../../redux/cart/cart.actions";
import { selectIsSubSeller } from "../../../redux/user/user.selector";
import CardItemCart from "../cardItemCart";

const CartItemsCliente = ({ cartItems, clearItemFromCart }) => {
  return (
    <div>
      {cartItems.map((el) => {
        return <CardItemCart item={el} clearItemFromCart={clearItemFromCart} />;
      })}
    </div>
  );
};

CartItemsCliente.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItemsCliente);
