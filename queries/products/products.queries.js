import axios from "axios";
import getConfig from "next/config";

import {
  isObjectNullOrUndefined,
  extractProperties,
} from "../../utils/uri.utils";

const { publicRuntimeConfig } = getConfig();

export const config = {
  headers: {
    "x-client-id": "6eb59dd2-7a48-4a13-9110-b78c56a3f861",
    "content-type": "application/json",
    "Access-Control-Allow-Methods": "*",
    "x-auth-token":
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibWFpbCI6ImRpZWdvLm9uYUBsaXZlLmNvbS5hciIsImZpcnN0TmFtZSI6IkRpZWdvIiwibGFzdE5hbWUiOiJPw7FhIiwicGhvbmUiOjQ0MTI2Mzc0LCJkbmkiOjM3Njc3MjEyLCJpc0VuYWJsZWQiOnRydWUsImlzQWN0aXZlIjp0cnVlLCJkYXRlQ3JlYXRlZCI6IjIwMjEtMDEtMDFUMDE6MzA6MjIuMzIyWiIsInVzZXJUeXBlIjp7ImlkIjoyLCJkZXNjcmlwdGlvbiI6ImFkbWluIn0sIndhbGxldCI6bnVsbCwiaWF0IjoxNjA5NjE0OTkxfQ._I8a3D3VDewI-gSCIh72IgOkPCUUbvhkSr_JxC71Hg0",
  },
};

export const getHomeProducts = async () => {
  const url = `${publicRuntimeConfig.backend_url}/public/products-stock?_limit=100`;
  delete config.params;
  const { data } = await axios.get(url, config);

  return data.results;
};

export const getProducts = async ({ queryKey }) => {
  const url = `${publicRuntimeConfig.backend_url}/public/search-products`;
  const [
    _key,
    {
      name,
      orderBySuggestedPrice,
      fromPrice,
      toPrice,
      colors,
      brands,
      category,
      subCategory
    },
  ] = queryKey;

  const finalParams = [
    { name },
    { orderBySuggestedPrice },
    { fromPrice },
    { toPrice },
    { colors },
    { brands },
    { category },
    { subCategory },
  ].filter((param) => !isObjectNullOrUndefined(param));

  config.params = { ...extractProperties(finalParams) };

  let data = {
    filters: { colors: [], brands: [] },
    products: { total: 0, results: [] },
  };

  try {
    const result = await axios.get(url, config);
    data = result.data;
  } catch (error) {
    if (error.response.status != 404) {
      throw error;
    }
  }

  return data;
};

export const getProductById = async (id) => {
  const url = `${publicRuntimeConfig.backend_url}/public/products/${id}`;
  const { data } = await axios.get(url, config);

  return data;
};

export const updateProducts = async (body) => {
  const url = `${publicRuntimeConfig.backend_url}/products`;
  const result = await axios.patch(url, body, config);
  return result;
};

export const createProducts = async (body) => {
  const url = `${publicRuntimeConfig.backend_url}/products`;
  const result = await axios.post(url, body, config);
  return result;
};

export const softDeleteProduct = async (id) => {
  const body = [
    {
      id: id,
      isActive: false,
    },
  ];
  const url = `${publicRuntimeConfig.backend_url}/products`;
  const result = await axios.patch(url, body, config);
  return result;
};

export const softDeleteProducts = (ids) => {
  let bodyIds = [];
  ids.forEach((id) => {
    bodyIds.push({
      id: id,
    });
  });

  const url = `${publicRuntimeConfig.backend_url}/products`;
  let configuration = {
    headers: config.headers,
    data: { ids },
  };

  return axios.delete(url, configuration);
};

export const increasePriceByPercentage = (ids, percentage) => {
  let body = {
    percentage: percentage,
    ids: ids,
  };
  const url = `${publicRuntimeConfig.backend_url}/amount-percentage-raise`;
  return axios.patch(url, body, config);
};
