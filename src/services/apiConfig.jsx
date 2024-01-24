import axios from "axios";
import { logoutUser, refreshAccessToken } from "./AuthApi";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../common/constants";
import { isTokenExpired } from "../utils/isTokenExpired";
import { isRefreshTokenExpired } from "../utils/isRefreshTokenExpired";
import { toast } from "react-toastify";
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
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // console.log("success:", response);
    return response;
  },

  async function (error) {
    const originalRequest = error.config;
    const token = localStorage.getItem(ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    //If refresh token expired call api to logout
    if (isRefreshTokenExpired(refreshToken)) {
      const logoutRes = await logoutUser(token);
      toast.error("Phiên đăng nhập đã hết hạn!");
      for (const key in objKeys) {
        localStorage.removeItem(objKeys[key]);
      }
      return Promise.reject(error);
    } else {
      //If token expired call api to refresh token
      if (isTokenExpired(token)) {
        originalRequest._retry = true;
        const newToken = await refreshAccessToken(token, refreshToken);
        if (newToken) {
          localStorage.setItem(ACCESS_TOKEN, newToken);
          axiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + newToken;
          return axiosInstance(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
