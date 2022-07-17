import { callAPIWithToken } from "../services/jwt-axios";

export const getViewed = async (username) => {
  const res = await callAPIWithToken.get(`/api/viewed/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const addViewed = async (username, productId) => {
  await callAPIWithToken
    .post("/api/viewed/add", {
      username: username,
      productId: productId,
    })
    .then((res) => {
      return res.data;
    });
};

export const clearViewed = async (username) => {
  await callAPIWithToken
    .post("/api/viewed/delete", {
      username: username,
    })
    .then((res) => {
      return res.data;
    });
};
