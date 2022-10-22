import axios from 'axios';
import getConfig from 'next/config';

import { config } from '../commons.queries';

const { publicRuntimeConfig } = getConfig();

export const getProductsRanking = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/stadistics/products-ranking`;

  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);
  return data;
};

export const getSellersRanking = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/stadistics/sellers-ranking`;

  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);

  return data.results;
};

export const getProfits = async (authToken, timeType, limit) => {
  const url = `${publicRuntimeConfig.backend_url}/stadistics/earnings?_limit=${limit}&roundBy=${timeType}`;

  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);
  return data;
};

export const getDeliveryHistory = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/orders?statusId=3&sellerId=notNull`;

  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);
  return data;
};

export const getSalesBySeller = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/stadistics/order-comissions`;

  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);
  return data;
};
