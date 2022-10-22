import axios from 'axios';

export const config = {
  headers: {
    'x-authorization': 'b4b6357e-f5e4-45ec-807b-cf722a710925',
    'Access-Control-Allow-Origin': '*',
  },
};

export const createImage = async (endpoint) => {
  const result = await axios.put(endpoint, config);
  return result;
};

export const deleteImage = async (endpoint) => {
  const result = await axios.delete(endpoint, config);
  return result;
};
