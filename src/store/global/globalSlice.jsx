import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCategoryMenu: false,
  test: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToggleMenu: (state, action) => {
      state.showCategoryMenu = action.payload;
    },
  },
});

export const { setToggleMenu } = globalSlice.actions;

export default globalSlice.reducer;
