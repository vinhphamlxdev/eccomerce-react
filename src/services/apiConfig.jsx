import axios from "axios";
import refreshAccessToken from "./AuthApi";

const BASE_API = `http://localhost:3001`;

const axiosInstance = axios.create({
  baseURL: BASE_API,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
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
    // If the response is successful, just return the response
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken(); // Function that refreshes token
      localStorage.setItem("access_token", access_token);
      // Update the authorization header
      originalRequest.headers["Authorization"] = "Bearer " + access_token;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;
