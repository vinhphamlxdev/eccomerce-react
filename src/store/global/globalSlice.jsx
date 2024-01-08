import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scrollValid: false,
  count: 0,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setScrollValue: (state, action) => {
      state.scrollValid = action.payload;
    },
    setCount: (state, action) => {
      state.count = state.count + 1;
    },
  },
});

export const { setScrollValue, setCount } = globalSlice.actions;

export default globalSlice.reducer;
