import axios from "axios";
import { jwtAxios } from "../services/jwt-axios";

export const googleInfo = async (access_token) => {
  const res = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const socialSignIn = async (email, name) => {
  const res = await jwtAxios.post("/api/auth/social-account", {
    email: email,
    name: name,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const updatePhone = async (id, phone) => {
  const res = await jwtAxios.post("/api/user/edit/phone", {
    userId: id,
    phone: phone,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const updateProfile = async (id, fullname, dob, gender) => {
  const res = await jwtAxios.post(`/api/customer/update/user/${id}`, {
    name: fullname,
    dob: dob,
    gender: gender,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
