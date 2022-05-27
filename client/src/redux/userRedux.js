import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../services/jwt-axios";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
  },

  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      setAuthToken(action.payload.accessToken);
    },
  },
});

export const { loginStart, loginSuccess } = userSlice.actions;
export default userSlice.reducer;
