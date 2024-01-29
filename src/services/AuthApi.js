import axios from "axios";
import { USER_REFRESH_TOKEN_HEADER } from "../common/constants";
import axiosConfig from "./apiConfig";

//REGISTER USER
export const registerUser = async (user) => {
  const response = await axiosConfig.post("/register", user);
  return response.data;
};
//LOGIN USER
export const loginUser = async (user) => {
  const response = await axiosConfig.post("/login", user);
  return response.data;
};

//REFRESH TOKEN
export const refreshAccessToken = async (refreshToken = "") => {
  try {
    const config = {
      headers: {
        [USER_REFRESH_TOKEN_HEADER]: refreshToken,
      },
    };
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    const response = await axiosConfig.post("/refresh-token", {}, config);
    if (response && response.data) {
      return response.data.accessToken;
    } else {
      throw new Error("Failed to refresh access token");
    }
  } catch (error) {
    console.error("Failed to refresh access token: ", error);
    throw error;
  }
};

//RESET PASSWORD
export const resetPassword = async (email) => {
  const response = await axiosConfig.post("/reset-password", email);
  return response;
};

//CONFIRM RESET PASSWORD
export const confirmResetPassword = async (data) => {
  const response = await axiosConfig.post("/reset-password/confirm", data);
  return response;
};
