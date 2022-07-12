import { jwtAxios } from "../../services/jwt-axios";

export const getFourProduct = async () => {
  const res = await jwtAxios.get("/api/product/limit/4");
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getThreeProduct = async () => {
  const res = await jwtAxios.get("/api/product/limit/3");
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
