import CartActionTypes from './cart.types';

import {
  addItemToCart,
  increaseItemQty,
  reduceItemFromCart,
  setSellingPriceForItem,
  clearNoStockItems,
} from './cart.utils';

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((cartItem) => cartItem.id !== action.payload.id),
      };
    case CartActionTypes.INCREASE_ITEM:
      return {
        ...state,
        cartItems: increaseItemQty(state.cartItems, action.payload),
      };
    case CartActionTypes.REDUCE_ITEM:
      return {
        ...state,
        cartItems: reduceItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ALL_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    case CartActionTypes.CLEAR_NO_STOCK_ITEMS:
      return {
        ...state,
        cartItems: clearNoStockItems(state.cartItems, action.payload),
      };
    case CartActionTypes.SET_ITEM_SELLING_PRICE:
      return {
        ...state,
        cartItems: setSellingPriceForItem(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
