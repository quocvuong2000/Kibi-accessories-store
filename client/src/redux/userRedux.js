import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../services/jwt-axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    accessToken: "",
    language: "en",
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
    updatePhoneRedux: (state, action) => {
      state.currentUser = action.payload;
    },
    updateEmailRedux: (state, action) => {
      state.currentUser["email"] = action.payload;
    },
    updateStart: (state) => {
      state.isFetching = true;
    },
    updateSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
    },
    updateLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  updateStart,
  updateSuccess,
  updateLanguage,
  updatePhoneRedux,
  updateEmailRedux,
} = userSlice.actions;
export default userSlice.reducer;
