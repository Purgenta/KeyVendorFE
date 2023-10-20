import axios from "axios";
export const baseURL = "http://localhost:5098/";
const authenticatedAxios = axios.create({ baseURL, withCredentials: true });
export default axios.create({
  baseURL,
  withCredentials: true,
});
export { authenticatedAxios };
