import { createSelector } from 'reselect';
import { deliveryVehicle } from '../../utils/constants.utils';

const selectCart = (state) => state.cart;

export const selectCartItems = createSelector([selectCart], (cart) => cart.cartItems);

export const selectCartItemsQty = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accum, item) => accum + item.quantity, 0)
);

export const selectCartItemsCost = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accum, item) => accum + item.sellingPrice * item.quantity, 0)
);

export const selectCartItemsTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accum, item) => accum + item.clientSellingPrice * item.quantity, 0)
);

export const selectCartItemsCommission = createSelector(
  [selectCartItemsTotal, selectCartItemsCost],
  (total, cost) => total - cost
);

export const selectCartItemsTruckDelivery = createSelector([selectCartItems], (cartItems) =>
  cartItems.some((item) => item.shippingType == deliveryVehicle.CAMIONETA)
);
