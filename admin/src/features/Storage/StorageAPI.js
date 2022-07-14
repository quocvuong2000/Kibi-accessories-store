import { callAPIWithToken } from "../../services/jwt-axios";

export const doGetStorageList = async (status, page) => {
  const res = await callAPIWithToken.get(
    `/api/storage/?page=${page}&status=${status}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
