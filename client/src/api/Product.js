import { jwtAxios } from "../services/jwt-axios";
export const getProduct = async (id) => {
  const res = await jwtAxios.get(`/api/product/get/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
export const getAllProduct = async (id) => {
  const res = await jwtAxios.get(`/api/product/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const searchProduct = async (kw) => {
  const res = await jwtAxios.get(`/api/product/search/${kw}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
