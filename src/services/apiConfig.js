import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../common/constants";
import { isTokenExpired } from "../utils/isTokenExpired";
import { isRefreshTokenExpired } from "../utils/isRefreshTokenExpired";
import { USER_ACCESS_TOKEN_HEADER } from "../common/constants";
import { refreshAccessToken } from "./AuthApi";
const BASE_API = `http://localhost:8080/api/v1`;
const objKeys = {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  USER,
};
const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers[USER_ACCESS_TOKEN_HEADER] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Do something with response data
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("success:", response);
    return response;
  },

  async function (error) {
    // Do something with response data
    const originalRequest = error.config;
    const token = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const userInfo = localStorage.getItem(USER);
    console.log("error:", error);
    //If refresh token expired call api to logout
    if (isRefreshTokenExpired(refreshToken)) {
      if (refreshToken) {
        for (const key in objKeys) {
          localStorage.removeItem(objKeys[key]);
        }
      }
      return;
    } else {
      //If token expired call api to refresh token
      if (isTokenExpired(token)) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken(refreshToken);
        if (newToken) {
          localStorage.setItem(ACCESS_TOKEN, newToken);
          axiosInstance.defaults.headers.common[USER_ACCESS_TOKEN_HEADER] =
            newToken;
          return axiosInstance(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
