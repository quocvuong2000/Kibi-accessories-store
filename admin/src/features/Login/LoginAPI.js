import { jwtAxios } from "../../services/jwt-axios";
import { loginStart } from "./LoginSlice";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  const res = await jwtAxios.post("/api/auth/login", user);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
