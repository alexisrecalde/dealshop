import ShopDataActionTypes from "./shopData.types";

import { mapClientInfo, mapDeliveryType } from "./shopData.utils";

const INITIAL_STATE = {
  isConfirmed: false,
  tipoDeEntrega: 2,
  nombreCliente: "",
  documentoCliente: 0,
  telefonoCliente: null,
  idVendedor: null,
  direccionEntrega: null,
  fecha: "",
  notas: "N/A",
  idSucursal: 1,
  envioId: 0,
  distanciaEnvio: 0,
  costoEnvio: 0,
  floor: "",
  apartment: "",
};

const shopDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopDataActionTypes.SET_CLIENT_INFO:
      return mapClientInfo(state, action.payload);
    case ShopDataActionTypes.CLEAR_CLIENT_INFO:
      return (state = INITIAL_STATE);
    case ShopDataActionTypes.CONFIRM_ORDER:
      return { ...state, isConfirmed: true };
    case ShopDataActionTypes.UNCONFIRM_ORDER:
      return { ...state, isConfirmed: false };
    case ShopDataActionTypes.UPDATE_DELIVERY_TYPE:
      return mapDeliveryType(state, action.payload);
    default:
      return state;
  }
};

export default shopDataReducer;
