import { callAPIWithToken } from "../../services/jwt-axios";

export const createBlog = async (
  title,
  content,
  categoryblog,
  author,
  categoryname,
  thumbnail
) => {
  const res = await callAPIWithToken.post(`/api/blog/`, {
    title: title,
    content: content,
    categoryblog: categoryblog,
    author: author,
    categoryname: categoryname,
    thumbnail: thumbnail,
    status: "PENDING",
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getBlogList = async (page) => {
  const res = await callAPIWithToken.get(`/api/blog/?page=${page}`);
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};

export const deleteBlog = async (id) => {
  const res = await callAPIWithToken.delete(`/api/blog/${id}`);
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};

export const updateBlog = async (
  id,
  title,
  content,
  categoryblog,
  author,
  categoryname,
  thumbnail
) => {
  const res = await callAPIWithToken.put(`/api/blog/update/${id}`, {
    title: title,
    content: content,
    categoryblog: categoryblog,
    author: author,
    categoryname: categoryname,
    status: "PENDING",
    thumbnail : thumbnail
  });
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};

export const getBlogListPending = async (page) => {
  const res = await callAPIWithToken.get(
    `/api/blog/?page=${page}&status=PENDING`
  );
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};

export const updateStatusBlog = async (id, status) => {
  const res = await callAPIWithToken.patch(`/api/blog/updatestatus/${id}`, {
    status: status,
  });
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};
