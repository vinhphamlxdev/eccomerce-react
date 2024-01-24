import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../../common/constants";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem(USER)) || null,
  isAuthenticated: localStorage.getItem(ACCESS_TOKEN) ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(USER, JSON.stringify(state.userInfo));
    },
    clearUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem(USER);
      state.isAuthenticated = false;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
    },
    setAccessTokenAndRefreshToken: (state, action) => {
      state.isAuthenticated = true;
      const { accessToken, refreshToken } = action.payload;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },
  },
});

export const { setUserInfo, clearUser, setAccessTokenAndRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
