import { jwtAxios } from "../services/jwt-axios";

export const subscribeUser = async (email) => {
  const res = await jwtAxios.post(`/api/subscribe/add`, {
    email: email,
  });
  if (res && res.status !== 200 && res.status !== 201)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
