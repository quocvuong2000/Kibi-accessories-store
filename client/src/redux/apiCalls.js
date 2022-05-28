import { loginStart, loginSuccess } from "./userRedux";
import {jwtAxios} from "../services/jwt-axios";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  const res = await jwtAxios.post("/api/auth/login", user);
  if (res.status === 200) {
    dispatch(loginSuccess(res.data));
  }
};
