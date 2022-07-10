import { callAPIWithToken } from "../services/jwt-axios";

export const getCategoryBlogById = async (id) => {
  const res = await callAPIWithToken.get(`/api/categoryblog/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
