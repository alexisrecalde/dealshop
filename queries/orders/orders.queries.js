import axios from "axios";
import getConfig from "next/config";

import { config } from "../commons.queries";
import {
  isObjectNullOrUndefined,
  extractProperties,
} from "../../utils/uri.utils";

const { publicRuntimeConfig } = getConfig();

export const getOrders = async ({ queryKey }) => {
  const url = `${publicRuntimeConfig.backend_url}/orders?_limit=10000`;
  const [
    _key,
    {
      authToken,
      deliveryTypeId,
      sellerId,
      id,
      orderDateFrom,
      orderDateTo,
      location,
      statusId,
      cadetId,
      clientName,
      superSellerId,
    },
  ] = queryKey;

  const finalParams = [
    { deliveryTypeId },
    { id },
    { orderDateFrom },
    { orderDateTo },
    { location },
    { sellerId },
    { statusId },
    { cadetId },
    { clientName },
    { superSellerId },
  ].filter((param) => !isObjectNullOrUndefined(param));

  config.headers["x-auth-token"] = authToken;
  config.params = { ...extractProperties(finalParams) };

  const { data } = await axios.get(url, config);

  return data;

};

export const getPurchase = async ({ queryKey }) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale`;
  const [_key, { authToken, clientStatusPaymentId }] = queryKey;

  const finalParams = [{ clientStatusPaymentId }].filter(
    (param) => !isObjectNullOrUndefined(param)
  );

  // config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;
  config.params = { ...extractProperties(finalParams) };

  const { data } = await axios.get(url, config);

  return data;
};

export const getOrdersAxios = async ({
  authToken,
  deliveryTypeId,
  id,
  orderDateFrom,
  orderDateTo,
  clientName,
  sellerId,
  cadetId,
}) => {
  const url = `${publicRuntimeConfig.backend_url}/orders?_limit=10000`;

  const finalParams = [
    { deliveryTypeId },
    { id },
    { orderDateFrom },
    { orderDateTo },
    { clientName },
    { sellerId },
    { cadetId },
  ].filter((param) => !isObjectNullOrUndefined(param));

  config.headers["x-auth-token"] = authToken;
  config.params = { ...extractProperties(finalParams) };

  const { data } = await axios.get(url, config);

  return data;
};

export const getOrderById = async ({ authToken, id }) => {
  const url = `${publicRuntimeConfig.backend_url}/orders/${id}`;

  delete config.params;
  config.headers["x-auth-token"] = authToken;

  const { data } = await axios.get(url, config);

  return data;
};

export const deleteOrder = async ({ authToken, id, message }) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;

  config.headers["x-auth-token"] = authToken;

  const body = [{ id, statusId: 5, cancelationCause: message }];

  await axios.patch(url, body, config);
};

export const patchOrder = async ({ authToken, id, sellerId, cadetId }) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;

  delete config.params;
  config.headers["x-auth-token"] = authToken;

  const finalBody = [{ id, sellerId, cadetId }].filter(
    (body) => !isObjectNullOrUndefined(body)
  );
  await axios.patch(url, finalBody, config);
};

export const patchOrderCadetMultiple = async ({
  authToken,
  id,
  sellerId,
  cadetId,
}) => {
  const url = `${publicRuntimeConfig.backend_url}/orders-cadet-multiple`;
  delete config.params;
  config.headers["x-auth-token"] = authToken;
  const finalBody = [cadetId, id];

  await axios.patch(url, finalBody, config);
};

export const changeStatusOrder = async ({
  authToken,
  id,
  message,
  statusId,
}) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;

  config.headers["x-auth-token"] = authToken;

  const body = [{ id, statusId: statusId, cancelationCause: message }];

  await axios.patch(url, body, config);
};


export const changeStatusPurchaseOrder = async ({ id, authToken, status }) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/${id}`;

  config.headers["x-auth-token"] = authToken;

  const body = status;

  await axios.patch(url, body, config);
};

export const changeStatusPurchaseOrderDelivery = async ({
  id,
  authToken,
  status,
}) => {

  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/${id}`;
  config.headers["x-auth-token"] = authToken;
  const body = status;

  await axios.patch(url, body, config);
};

export const changeStatusMultiplePurchaseOrderDelivery = async ({
  authToken,
  body,
}) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/multiples-order`;
  config.headers["x-auth-token"] = authToken;
  await axios.patch(url, body, config);
};

export const changeStatusMultipleOrders = async ({ authToken, body }) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;
  config.headers["x-auth-token"] = authToken;
  await axios.patch(url, body, config);
};

export const refundOrder = async (authToken, orderId, items) => {
  const url = `${publicRuntimeConfig.backend_url}/orders`;

  config.headers["x-auth-token"] = authToken;

  const body = [{ id: orderId, statusId: 4, products: items }];

  await axios.patch(url, body, config);
};


