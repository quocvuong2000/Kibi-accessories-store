import axios from "axios";
import Cookies from "js-cookie";

const localUrl = "http://localhost:5000";
const jwtAxios = axios.create({
  baseURL: localUrl, // YOUR_API_URL HERE
  timeout: 5000,
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});
export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    Cookies.set("token", token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    Cookies.remove("token");
  }
};
export { jwtAxios };
