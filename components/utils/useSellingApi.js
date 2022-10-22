import axios from "axios";
import getConfig from "next/config";

export const config = {
  headers: {
    "content-type": "application/json",
  },
};

const sellOptions = () => {
  const { publicRuntimeConfig } = getConfig();

  const postSellClientLoged = async (authToken, items) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const body = items;

    const response = await axios.post(url, body, config);
    return response;
  };

  const postSellClientNoLoged = async (items) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/public`;
    const body = items;
    const response = await axios.post(url, body);
    return response;
  };

  const postSellClientApprove = async (authToken, info) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-sale/validate-sale-mp`;
    config.headers["Authorization"] = `Bearer ${authToken}`;

    const body = info;

    const response = await axios.post(url, body, config);
    return response;
  };

  return { postSellClientLoged, postSellClientApprove, postSellClientNoLoged };
};

export default sellOptions;
