import { createSelector } from 'reselect';

const selectShopData = (state) => state.shopData;

export const selectClientData = createSelector([selectShopData], (shopData) => shopData);

export const selectIsconfirmed = createSelector([selectShopData], (shopData) => shopData.isConfirmed);
