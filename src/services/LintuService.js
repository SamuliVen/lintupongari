import axios from "axios";
const baseUrl = "/api/lintudb/";
const havaintoUrl = "/api/lintudb/havainto";
const lintuUrl = "/api/lintudb/lintu";
const userUrl = "/api/lintudb/user";
const wikiUrl = "/api/wiki?haku=";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getWikiHaku = async (haku) => {
  const response = await axios.get(wikiUrl + haku);
  return response.data;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getHavainto = () => {
  const request = axios.get(havaintoUrl);
  return request.then((response) => response.data);
};

const getLintu = () => {
  const request = axios.get(lintuUrl);
  return request.then((response) => response.data);
};

const getUser = () => {
  const request = axios.get(userUrl);
  return request.then((response) => response.data);
};

const createUser = async (newObject) => {
  const response = await axios.post(userUrl, newObject);
  return response.data;
};

const createHavainto = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(havaintoUrl, newObject, config);
  return response.data;
};

const createLintu = async (newObject) => {
  const response = await axios.post(lintuUrl, newObject);
  return response.data;
};

const updateHavainto = (id, newObject) => {
  const request = axios.put(`${havaintoUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

const removeHavainto = (id) => {
  const request = axios.delete(`${havaintoUrl}/${id}`);
  return request.then((response) => response.data);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  getHavainto,
  getLintu,
  getUser,
  createUser,
  createHavainto,
  createLintu,
  updateHavainto,
  removeHavainto,
  setToken,
  getWikiHaku,
};
