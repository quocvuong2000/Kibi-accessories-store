import { callAPIWithToken } from "../services/jwt-axios";

export const getAllProductCart = async (user) => {
  const res = await callAPIWithToken.get(`/api/cart/${user}`);

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
