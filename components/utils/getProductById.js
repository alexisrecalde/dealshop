import axios from "axios";
import getConfig from "next/config";

export const config = {
  headers: {
    "content-type": "application/json",
  },
};

const getProductById = () => {
  const { publicRuntimeConfig } = getConfig();

  const getProductImage = async (product) => {
    const url = `${publicRuntimeConfig.backend_url_client}/product/${product}`;
    // config.headers["Authorization"] = `Bearer ${authToken}`;
    const { data } = await axios.get(url);
    return data.photos[0];
  };

  return { getProductImage };
};

export default getProductById;
