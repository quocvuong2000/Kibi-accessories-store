import { loginStart, loginSuccess } from "./userRedux";
import axios from "axios";
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  const res = await axios.post("http://localhost:5000/api/auth/login", user);
  if (res.status === 200) {
    dispatch(loginSuccess(res.data));
  }
};
