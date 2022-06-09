import axios from "axios";
import Cookies from "js-cookie";
import { browserHistory as history } from "../routes/history";
import { Navigate } from "react-router-dom";

const devUrl = "http://localhost:5000";

const token =
  typeof Cookies.get("token") !== "undefined" ? Cookies.get("token") : "";

const jwtAxios = axios.create({
  baseURL: devUrl, // YOUR_API_URL HERE
  timeout: 5000,
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});

const callAPIWithToken = axios.create({
  baseURL: devUrl, //v YOUR_API_URL HERE
  timeout: 30000,
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

callAPIWithToken.interceptors.request.use(
  async (config) => {
    const tok = await Cookies.get("token");
    config.headers = {
      Authorization: `Bearer ${tok}`,
      Accept: "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

callAPIWithToken.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 401) {
      Cookies.remove("token");
      <Navigate replace to="/login"/>;
      // redirect to login
    }

    if (err.response && err.response.status === 403) {
      <Navigate replace to="/403" />;
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    Cookies.set("token", token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    Cookies.remove("token");
  }
};

export { callAPIWithToken, jwtAxios };
