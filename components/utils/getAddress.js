import axios from "axios";
import getConfig from "next/config";

export const config = {
  headers: {
    "content-type": "application/json",
  },
};

const getAddress = () => {
  const { publicRuntimeConfig } = getConfig();

  const getAddressById = async (authToken) => {
    const url = `${publicRuntimeConfig.backend_url_client}/client-address`;
    config.headers["Authorization"] = `Bearer ${authToken}`;
    const response = await axios.get(url, config);
    return response;
  };

  return { getAddressById };
};

export default getAddress;
