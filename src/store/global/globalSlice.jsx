import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setTest: (state, action) => {
      state.showCategoryMenu = action.payload;
    },
  },
});

export const { setTest } = globalSlice.actions;

export default globalSlice.reducer;
