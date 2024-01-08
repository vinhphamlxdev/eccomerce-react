import { combineReducers, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./global/globalSlice";
const reducer = combineReducers({
  global: globalReducer,
});
const store = configureStore({
  reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
export default store;
