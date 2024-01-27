import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN, REFRESH_TOKEN, USER } from "../../common/constants";

const initialState = {
  userInfo: JSON.parse(localStorage.getItem(USER)) || null,
  render: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem(USER, JSON.stringify(state.userInfo));
    },
    setClearUser: (state) => {
      state.userInfo = null;
    },
    setAccessTokenAndRefreshToken: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
    },
    setRender: (state, action) => {
      state.render = !state.render;
    },
  },
});

export const {
  setUserInfo,
  setClearUser,
  setAccessTokenAndRefreshToken,
  setRender,
} = authSlice.actions;

export default authSlice.reducer;
