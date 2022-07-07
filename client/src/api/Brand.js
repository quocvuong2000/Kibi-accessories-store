import { callAPIWithToken } from "../services/jwt-axios";

export const getBrand = async () => {
  const res = await callAPIWithToken.get(`/api/brand/`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
