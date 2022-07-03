import { callAPIWithToken, jwtAxios } from "../../services/jwt-axios";

//GET ADDRESS
export const getAddress = async (username) => {
  const res = await callAPIWithToken.get(`/api/address/get/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//CREATE ORDER BY CARD
export const doCheckoutByCard = async (data) => {
  const res = await jwtAxios.post(`/api/stripe/payment`, data);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
//CREATE ORDER BY COD
export const doCheckoutByCod = async (data) => {
  const res = await callAPIWithToken.post(`/api/order/create`, data);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//DELETE ALL CART AFTER CHECKOUT SUCCESS
export const doDeleteAllCart = async (username) => {
  const res = await callAPIWithToken.post("/api/cart/delete/all", username);
  if (res & (res.status !== 200))
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
