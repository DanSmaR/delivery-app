import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3003',
});

export const requestData = async (endpoint) => {
  const { data } = await instance.get(endpoint);
  return data;
};

export default instance;
