import axios from "axios";
import Cookies from "js-cookie";
const token =
  typeof Cookies.get("tokenClient") !== "undefined"
    ? Cookies.get("tokenClient")
    : "";

const localUrl = "http://localhost:5000";
const jwtAxios = axios.create({
  baseURL: localUrl, // YOUR_API_URL HERE
  timeout: 5000,
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
  },
});
const callAPIWithToken = axios.create({
  baseURL: localUrl, //v YOUR_API_URL HERE
  timeout: 30000,
  timeoutErrorMessage: "Timeout error",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
});

callAPIWithToken.interceptors.request.use(
  async (config) => {
    const tok = Cookies.get("tokenClient");
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
    // if (err.response && err.response.status === 401) {
    //   localStorage.removeItem("persist:root");
    //   Cookies.remove("tokenClient");
    //   window.location.href = "/login";
    // }

    if (err.response && err.response.status === 403) {
      localStorage.removeItem("persist:root");
      Cookies.remove("tokenClient");
    }

    if (err.response && err.response.status === 500) {
      window.location.href = "/500";
    }

    if (err.response && err.response.status === 504) {
      window.location.href = "https://www.google.com/";
    }
    return Promise.reject(err);
  }
);

jwtAxios.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res;
    }
    return res;
  },
  (err) => {
    if (err.response && err.response.status === 504) {
      window.location.href = "https://www.google.com/";
    }
    return Promise.reject(err);
  }
);

export const setAuthToken = (token) => {
  if (token) {
    jwtAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
    Cookies.set("tokenClient", token);
  } else {
    delete jwtAxios.defaults.headers.common.Authorization;
    Cookies.remove("tokenClient");
  }
};
export { jwtAxios, callAPIWithToken };
