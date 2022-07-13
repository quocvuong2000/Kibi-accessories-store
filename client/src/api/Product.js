import { jwtAxios } from "../services/jwt-axios";
export const getProduct = async (id) => {
  const res = await jwtAxios.get(`/api/product/get/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
export const getAllProduct = async (
  id,
  page,
  name = "",
  brand = "",
  fromprice = "",
  toprice = "",
  rating = ""
) => {
  const res = await jwtAxios.get(
    `/api/product/${id}?page=${page}&name=${name}&brand=${brand}&fromPrice=${fromprice}&toPrice=${toprice}&rating=${rating}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getAllProductByBrand = async (
  id,
  page,
  name = "",
  brand = "",
  fromprice = "",
  toprice = "",
  rating = ""
) => {
  const res = await jwtAxios.get(
    `/api/product/brand/${id}?page=${page}&name=${name}&brand=${brand}&fromPrice=${fromprice}&toPrice=${toprice}&rating=${rating}`
  );
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

export const getProductHome = async () => {
  const res = await jwtAxios.get(`/api/product/brand/62a2039776e89c02819a1703`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getLimitProduct = async (count) => {
  const res = await jwtAxios.get(`/api/product/limit/${count}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getAllProductNoPage = async () => {
  const res = await jwtAxios.get(`/api/product/getall/all`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
