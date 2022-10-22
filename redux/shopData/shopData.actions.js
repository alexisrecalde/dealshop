import ShopDataActionTypes from './shopData.types';

export const setClientInfo = (clientData) => ({
    type: ShopDataActionTypes.SET_CLIENT_INFO,
    payload: clientData,
});

export const clearClientInfo = () => ({
    type: ShopDataActionTypes.CLEAR_CLIENT_INFO,
});

export const setConfirmOrder = () => ({
    type: ShopDataActionTypes.CONFIRM_ORDER,
});

export const setUnconfirmOrder = () => ({
    type: ShopDataActionTypes.UNCONFIRM_ORDER,
});

export const updateDeliveryType = (deliveryType) => ({
    type: ShopDataActionTypes.UPDATE_DELIVERY_TYPE,
    payload: deliveryType,
});
