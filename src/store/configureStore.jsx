import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import cartReducer from "./cart/cartSlice";
import authReducer from "./auth/authSlice";
const reducer = combineReducers({
  global: globalReducer,
  cart: cartReducer,
  auth: authReducer,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
