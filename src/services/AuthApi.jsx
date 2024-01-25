import { ACCESS_TOKEN, REFRESH_TOKEN } from "../common/constants";
import axiosConfig from "./apiConfig";
const USER_ACCESS_TOKEN_HEADER = "x-user-access-token";
const USER_REFRESH_TOKEN_HEADER = "x-user-refresh-token";
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
export const getUserInfo = async () => {
  const response = await axiosConfig.get("/user-info");
  return response;
};
//LOGOUT USER
export const logoutUser = async (accessToken) => {
  const config = {
    headers: {
      [USER_ACCESS_TOKEN_HEADER]: accessToken,
    },
  };
  const response = await axiosConfig.delete("/users/logout", config);
  return response;
};
//REFRESH TOKEN
export const refreshAccessToken = async (
  accessToken = "",
  refreshToken = ""
) => {
  try {
    const config = {
      headers: {
        [USER_ACCESS_TOKEN_HEADER]: accessToken,
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
//CHANGE PASSWORD
export const changePassword = async (data) => {
  const response = await axiosConfig.patch("/users/change-password", data);
  return response;
};
