import { callAPIWithToken } from "../services/jwt-axios";

export const getBlogByCate = async (id, limit, page) => {
  const res = await callAPIWithToken.get(
    `/api/blog/${id}?page=${page}&limit=${limit}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getAllBlog = async (limit) => {
  const res = await callAPIWithToken.get(`/api/blog/all?limit=${limit}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getDetailBlog = async (id) => {
  const res = await callAPIWithToken.get(`/api/blog/get/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
