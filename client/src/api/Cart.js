import { jwtAxios } from "../services/jwt-axios";

export const getAllProductCart = async () => {
  const res = await jwtAxios.get(`/api/cart`);

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
