import axios from 'axios';
import getConfig from 'next/config';

import { config } from '../commons.queries';

const { publicRuntimeConfig } = getConfig();

export const getWalletById = async (id, authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/wallets/${id}`;
  config.headers['x-auth-token'] = authToken;

  const { data } = await axios.get(url, config);

  return data;
};

export const addMovement = async (id, amount, description, authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/wallets/${id}/movements`;
  config.headers['x-auth-token'] = authToken;

  const movement = {
    amount,
    description,
    walletId: parseInt(id),
  };

  await axios.post(url, movement, config);
};

export const doPayMovement = async (authToken, id) => {
  const url = `${publicRuntimeConfig.backend_url}/wallet-movements/${id}`;

  config.headers['x-auth-token'] = authToken;

  await axios.patch(url, {}, config);
};
