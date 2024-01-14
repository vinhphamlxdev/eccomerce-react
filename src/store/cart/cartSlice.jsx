import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("carts")) || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const newProduct = action.payload;
      const existIndex = state.cartItems.findIndex(
        (item) => item.id === newProduct.id
      );
      if (existIndex !== -1) {
        state.cartItems[existIndex].quantity += newProduct.quantity;
        localStorage.setItem("carts", JSON.stringify(state.cartItems));
      } else {
        state.cartItems.push(newProduct);
      }
      localStorage.setItem("carts", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const idNeedToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== idNeedToRemove
      );
      localStorage.setItem("carts", JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existIndex = state.cartItems.findIndex((item) => item.id === id);
      if (existIndex !== -1) {
        state.cartItems[existIndex].quantity = quantity;
        localStorage.setItem("carts", JSON.stringify(state.cartItems));
      }
    },
  },
});

export const { addProductToCart, removeFromCart, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
