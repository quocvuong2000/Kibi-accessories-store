import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/Login/LoginSlice";
import { createBrowserHistory } from "history";
import { createReduxHistoryContext } from "redux-first-history";

const rootReducer = combineReducers({ user: userReducer });
// const { createReduxHistory } =
//   createReduxHistoryContext({ history: createBrowserHistory() });
export const store = configureStore({
  reducer: rootReducer,
});

// export const history = createReduxHistory(store);
