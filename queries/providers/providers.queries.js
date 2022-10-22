import axios from 'axios';
import getConfig from 'next/config';

import { config } from '../commons.queries';

const { publicRuntimeConfig } = getConfig();

export const getProviders = async () => {
  const url = `${publicRuntimeConfig.backend_url}/public/providers`;

  delete config.params;
  const { data } = await axios.get(url, config);

  return data.results;
};

export const addProvider = async (authToken, providersName) => {
  const url = `${publicRuntimeConfig.backend_url}/public/providers`;

  delete config.params;
  config.headers['x-auth-token'] = authToken;

  const body = {
    description: providersName,
  };

  const { data } = await axios.post(url, body, config);

  return data.results;
};

export const deleteProvider = async (authToken, providerId) => {
  const url = `${publicRuntimeConfig.backend_url}/public/providers/${providerId}`;

  delete config.params;
  config.headers['x-auth-token'] = authToken;

  await axios.delete(url, config);
};
