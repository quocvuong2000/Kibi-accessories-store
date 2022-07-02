import axios from "axios";
import { callAPIWithToken, jwtAxios } from "../services/jwt-axios";

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

export const updateEmail = async (id, email) => {
  const res = await jwtAxios.post("/api/user/edit/email", {
    userId: id,
    email: email,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const updatePassword = async (id, oldpassword, newpassword) => {
  const res = await callAPIWithToken.patch(
    `/api/customer/update/password/${id}`,
    {
      oldpassword: oldpassword,
      password: newpassword,
    }
  );
  if (res && res.status !== 200 && res.status !== 202)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
