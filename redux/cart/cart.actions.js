import CartActionTypes from './cart.types';

export const addItemToCart = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

export const increaseItemFromCart = (item) => ({
  type: CartActionTypes.INCREASE_ITEM,
  payload: item,
});

export const reduceItemFromCart = (item) => ({
  type: CartActionTypes.REDUCE_ITEM,
  payload: item,
});

export const clearItemFromCart = (item) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: item,
});

export const clearAllItemsFromCart = () => ({
  type: CartActionTypes.CLEAR_ALL_ITEMS,
});

export const clearNoStockItems = (items) => ({
  type: CartActionTypes.CLEAR_NO_STOCK_ITEMS,
  payload: items,
});

export const setSellingPrice = (item) => ({
  type: CartActionTypes.SET_ITEM_SELLING_PRICE,
  payload: item,
});
