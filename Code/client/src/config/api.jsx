import axios from "axios";
axios.defaults.withCredentials = true;
export const api = axios.create({
  baseURL: "http://localhost:3500", //should be in .env
});
