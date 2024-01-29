import { USER_ACCESS_TOKEN_HEADER } from "../common/constants";
import axiosConfig from "./apiConfig";

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
//GET USER INFO
export const getUserInfo = async () => {
  const response = await axiosConfig.get("/users/user-info");
  return response;
};

//CHANGE PASSWORD
export const changePassword = async (data) => {
  const response = await axiosConfig.patch("/users/change-password", data);
  return response;
};
//UPDATE CONTACT INFO
export const updateContactInfo = async (updateData) => {
  const response = await axiosConfig.put("/users/contact-info", updateData);
  return response;
};
