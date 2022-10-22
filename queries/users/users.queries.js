import axios from "axios";
import getConfig from "next/config";

import { config } from "../commons.queries";
import {
  isObjectNullOrUndefined,
  extractProperties,
} from "../../utils/uri.utils";
import { selectUserToken } from "../../redux/user/user.selector";
import { createStructuredSelector } from "reselect";

const { publicRuntimeConfig } = getConfig();

export const getUsers = async ({ queryKey }) => {
  const url = `${publicRuntimeConfig.backend_url}/users?_limit=10000`;
  const [
    _key,
    {
      authToken,
      statusId,
      firstName,
      lastName,
      userType,
      email,
      superSellerId,
    },
  ] = queryKey;

  const finalParams = [
    { statusId, firstName, lastName, userType, email, superSellerId },
  ].filter((param) => !isObjectNullOrUndefined(param));

  config.headers["x-auth-token"] = authToken;
  config.params = { ...extractProperties(finalParams) };

  let users = { results: [] };

  try {
    const { data } = await axios.get(url, config);
    users = data;
  } catch (error) {}

  return users;
};

export const getAllUsers = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/users?_limit=10000`;

  config.headers["x-auth-token"] = authToken;

  const { data } = await axios.get(url, config);

  return data.results;
};

export const postApproveUser = async (user, authToken) => {
  try {
    const url = `${publicRuntimeConfig.backend_url}/security/approve-user`;

    config.headers["x-auth-token"] = authToken;

    const body = { email: user.email };

    await axios.post(url, body, config);
  } catch (error) {}
};

export const postRejectUser = async (user, authToken) => {
  try {
    const url = `${publicRuntimeConfig.backend_url}/security/reject-user`;

    config.headers["x-auth-token"] = authToken;

    const body = { email: user.email };

    await axios.post(url, body, config);
  } catch (error) {}
};

export const postRecoverPassword = async (email) => {
  try {
    const url = `${publicRuntimeConfig.backend_url}/public/security/recover-user`;

    const authenticateRequest = email;

    await axios.post(url, authenticateRequest, config);
  } catch (error) {}
};

export const patchUserData = async (user, authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/users/${user.userId}`;
  config.headers["x-auth-token"] = authToken;

  const body = { phone: user.phone, dni: user.dni };

  await axios.patch(url, body, config);
};

export const patchSuperseller = async (user, authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/users/${user.userId}`;
  config.headers["x-auth-token"] = authToken;

  const body = { superSellerId: user.superSellerId };

  await axios.patch(url, body, config);
};

export const getAllSellers = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/users?_limit=10000`;
  config.headers["x-auth-token"] = authToken;
  config.params = { userType: 3 };

  let sellers = [];

  try {
    const { data } = await axios.get(url, config);

    sellers = data.results.map((seller) => {
      return {
        id: seller.id,
        firstName: seller.firstName,
        lastName: seller.lastName,
      };
    });
  } catch (error) {}

  return sellers;
};

export const getAllCadets = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url}/users?_limit=10000`;
  config.headers["x-auth-token"] = authToken;
  config.params = { userType: 5 };

  let cadets = [];

  try {
    const { data } = await axios.get(url, config);

    cadets = data.results.map((cadet) => {
      return {
        id: cadet.id,
        firstName: cadet.firstName,
        lastName: cadet.lastName,
      };
    });
  } catch (error) {}

  return cadets;
};

export const verifyUser = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/auth/user-info`;

  //const url = `${publicRuntimeConfig.backend_url}/auth/user-info`;

  config.headers["x-auth-token"] = authToken;

  config.headers["Authorization"] = `Bearer ${authToken}`;

  const res = await axios.get(url, config);

  return res;
};

// export const verifyUser = async (authToken) => {
//   const url = `${publicRuntimeConfig.backend_url}/security/refresh`;
//   config.headers["x-auth-token"] = authToken;

//   return await axios.post(url, {}, config);
// };

export const getSellersList = async ({ queryKey }) => {
  const url = `${publicRuntimeConfig.backend_url}/subsellers?_limit=10000`;
  let listOfSellers = {
    subsellers: [],
    sellers: [],
  };

  const { authToken } = queryKey;
  config.headers["x-auth-token"] = authToken;

  try {
    const { data } = await axios.get(url, config);

    listOfSellers.subsellers = data.results.map((subseller) => {
      return {
        id: subseller.id,
        firstName: subseller.firstName,
        lastName: subseller.lastName,
        phone: subseller.phone,
        leader:
          subseller.superSellerId != null
            ? `${subseller.superSeller.firstName} ${subseller.superSeller.lastName}`
            : "",
        superSellerId: subseller.superSellerId,
      };
    });
  } catch (error) {}

  listOfSellers.sellers = await getAllSellers(authToken);

  return listOfSellers;
};

export const getSubsellers = async (authToken, superSellerId) => {
  const url = `${publicRuntimeConfig.backend_url}/users?_limit=10000&superSellerId=${superSellerId}`;

  delete config.params;
  config.headers["x-auth-token"] = authToken;

  let users = [];

  try {
    const { data } = await axios.get(url, config);
    users = data.results;
  } catch (error) {}

  return users;
};

export const patchClientData = async (user, authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client/${user.userId}`;

  config.headers["Authorization"] = `Bearer ${authToken}`;

  const body = { phone: user.phone, email: user.email };

  await axios.patch(url, body, config);
};

export const postClientAddress = async (address, user) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-address`;
  config.headers["Authorization"] = `Bearer ${user.token}`;
  const body = address;

  await axios.post(url, body, config);
};

export const patchClientAddress = async (address, addressId, authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-address/${addressId.id}`;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  const body = address;

  await axios.patch(url, body, config);
};

export const getClientList = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getClientInfo = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/auth/user-info`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchaseOfClient = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPedidosByCadetId = async (props) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/order-by-cadetId/${props.idRepartidor}`;
  config.headers["x-auth-token"] = props.authToken;
  config.headers["Authorization"] = `Bearer ${props.authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getPedidosByCadetIdEntregados = async (props) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/order-by-cadetId-entregados/${props.idRepartidor}`;
  config.headers["x-auth-token"] = props.authToken;
  config.headers["Authorization"] = `Bearer ${props.authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchaseWithoutCadet = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/order-sale-without-cadet`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getNameClient = async (id, authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client/${id}`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  try {
    const { data } = await axios.get(url, config);
    return data.email;
  } catch (error) {
    throw error;
  }
};

//Actualizar fecha de estimada o de entrega de una venta directa

export const updateFechaEstimadaEntrega = async ({ id, body, authToken }) => {
  const url = `${publicRuntimeConfig.backend_url_client}/client-sale/${id}`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  const bodySent = body;

  const { data } = await axios.patch(url, bodySent, config);
  return data;
};

export const getSellerById = async (authToken) => {
  const url = `${publicRuntimeConfig.backend_url_client}/auth/seller-id`;
  config.headers["x-auth-token"] = authToken;
  config.headers["Authorization"] = `Bearer ${authToken}`;

  const { data } = await axios.get(url, config);
  return data;
};

export const getCity = (latitud) => {
  var geocoder;
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(
    latitud.coords.latitude,
    latitud.coords.longitude
  );

  geocoder.geocode({ latLng: latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      if (results[0]) {
        const city = results[0].address_components[4].long_name;
        const localidad = results[0].address_components[2].long_name;

        return localidad;
      }
    }
  });
};
