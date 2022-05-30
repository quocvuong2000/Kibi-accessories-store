import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/Login/LoginSlice";

const rootReducer = combineReducers({ user: userReducer });

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
