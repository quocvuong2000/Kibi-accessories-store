import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setAuthToken } from "../services/jwt-axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    accessToken: "",
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.accessToken = action.payload.accessToken;
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
