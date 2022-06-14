import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setAuthToken } from "../services/jwt-axios";
const token =
  typeof Cookies.get("token") !== "undefined" ? Cookies.get("token") : "";
const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    accessToken: token,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      if (action.payload.accessToken) {
        setAuthToken(action.payload.accessToken);
      } else {
        setAuthToken(action.payload.access_token);
      }
    },
  },
});

export const { loginStart, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
