import axios from "axios";
import getConfig from "next/config";

import { config } from "../commons.queries";
import { orderStatusEnum } from "../../utils/constants.utils";

const { publicRuntimeConfig } = getConfig();

let direccionObjeto;

export const postOrder = async (cartItems, shopData, userId, authToken) => {
  if (shopData.tipoDeEntrega === 1) {
    direccionObjeto = {
      lat: shopData.direccionEntrega.lat,
      location: shopData.direccionEntrega.location,
      lon: shopData.direccionEntrega.lon,
      province: shopData.direccionEntrega.province,
      street: shopData.direccionEntrega.street,
      streetNumber: shopData.direccionEntrega.streetNumber,
      floor: shopData.floor,
      apartment: shopData.apartment,
    };
  } else {
    direccionObjeto = null;
  }
  const items = cartItems.map((item) => {
    return {
      productId: item.id,
      quantity: item.quantity,
      costPrice: item.costPrice,
      sellingPrice: item.sellingPrice,
      suggestedPrice: item.suggestedPrice,
      clientSellingPrice: item.clientSellingPrice,
      weight: item.weight,
    };
  });

  const orderData = {
    shippingCostId: shopData.envioId,
    distanceInKm: shopData.distanciaEnvio,
    estimatedDeliveryDate: shopData.fecha,
    clientName: shopData.nombreCliente,
    clientDocument: shopData.documentoCliente,
    clientAddress: direccionObjeto,
    clientPhone: shopData.telefonoCliente,
    deliveryTypeId: shopData.tipoDeEntrega,
    branchId: shopData.idSucursal,
    additionalInfo: shopData.notas,
    sellerId: userId,
  };

  if (orderData.deliveryTypeId == 3) {
    orderData.sellerId = shopData.idVendedor;
  }

  const order = { ...orderData, products: items, cancelationCause: "" };

  const url = `${publicRuntimeConfig.backend_url}/orders`;

  config.headers["x-auth-token"] = authToken;

  const result = await axios.post(url, order, config);

  return result.data;
};

export const patchOrderTodelivered = async (id, authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;

  config.headers["x-auth-token"] = authToken;

  const order = [{ id, statusId: orderStatusEnum.ENTREGADO }];

  await axios.patch(url, order, config);
};

export const getShippingData = async (authToken, distance, typeOfVehicle) => {
  const url = `${publicRuntimeConfig.backend_url}/shipping-costs?distance=${distance}&shippingType=${typeOfVehicle}`;

  config.headers["x-auth-token"] = authToken;

  const { data } = await axios.get(url, config);

  return data;
};
