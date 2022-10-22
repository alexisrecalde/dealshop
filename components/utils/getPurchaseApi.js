import axios from "axios";
import getConfig from "next/config";

export const config = {
  headers: {
    "content-type": "application/json",
  },
};

const getPurchaseInfo = () => {
  const { publicRuntimeConfig } = getConfig();

  const getMyPurchase = async (authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/auth/user-orders`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const response = await axios.get(url, config);
    return response;
  };

  const getMyPurchaseOfClient = async (id, authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/all/${id}`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const getMyPurchaseDetailByOne = async (id, authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/detail/${id}`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const getMyPurchaseByOne = async (id, authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/by-one/${id}`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const { data } = await axios.get(url, config);
    return data;
  };

  const getPurchaseClientInfo = async (id, authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/client-info/${id}`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const { data } = await axios.get(url, config);
    return data;
  };

  return {
    getMyPurchase,
    getMyPurchaseOfClient,
    getMyPurchaseDetailByOne,
    getMyPurchaseByOne,
    getPurchaseClientInfo
  };
};

export default getPurchaseInfo;
