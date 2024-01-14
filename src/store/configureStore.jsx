import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
import cartReducer from "./cart/cartSlice";
const reducer = combineReducers({
  global: globalReducer,
  cart: cartReducer,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
