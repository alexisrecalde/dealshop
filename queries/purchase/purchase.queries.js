import axios from "axios";
import getConfig from "next/config";

import { config } from "../commons.queries";
import {
  isObjectNullOrUndefined,
  extractProperties,
} from "../../utils/uri.utils";

const { publicRuntimeConfig } = getConfig();

export const changeStatusPurchase = async ({
  authToken,
  id,
  message,
  statusId,
}) => {
  const url = `${publicRuntimeConfig.backend_url_client}/orders`;

  config.headers["x-auth-token"] = authToken;

  const body = [{ id, statusId: statusId, cancelationCause: message }];

  await axios.patch(url, body, config);
};

export const getSeguimiento = async (id, authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/order-sale-status/${id}`;

  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  //   const body = [{ id, statusId: statusId, cancelationCause: message }];

  const { data } = await axios.get(url, config);
  return data;
};
