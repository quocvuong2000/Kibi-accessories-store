import { jwtAxios } from "../services/jwt-axios";

export const getAllCategory = async () => {
  const res = await jwtAxios.get(`/api/category`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
