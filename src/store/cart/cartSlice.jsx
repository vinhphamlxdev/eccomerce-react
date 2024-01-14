import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("carts")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      state.cartItems = action.payload;
    },
  },
});

export const { addProductToCart } = cartSlice.actions;

export default cartSlice.reducer;
