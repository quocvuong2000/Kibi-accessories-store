import { callAPIWithToken, jwtAxios } from "../../services/jwt-axios";

//GET ADDRESS
export const getAddress = async (username) => {
  const res = await callAPIWithToken.get(`/api/address/get/${username}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//GET ADDRESS BY USERNAME AND ID
export const getDetailAddress = async (username, id) => {
  const res = await callAPIWithToken.get(
    `/api/address/get/${username}/detail/${id}`
  );
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

//------------------------------------------------Momo------------------------------------------
export const goLinkMomoPayment = async (amount) => {
  const res = await callAPIWithToken.post("/api/momo/get-momo-payment-link", {
    amount: amount,
  });
  if (res & (res.status !== 200))
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

//get signature
export const doGetSignature = async (
  amount,
  extraData,
  message,
  orderId,
  orderInfo,
  orderType,
  partnerCode,
  payType,
  requestId,
  responseTime,
  resultCode,
  transId
) => {
  const res = await callAPIWithToken.post("/api/momo/signature", {
    amount: amount,
    extraData: extraData,
    message: message,
    orderId: orderId,
    orderInfo: orderInfo,
    orderType: orderType,
    partnerCode: partnerCode,
    payType: payType,
    requestId: requestId,
    responseTime: responseTime,
    resultCode: resultCode,
    transId: transId,
  });
  if (res & (res.status !== 200))
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const updateOrder = async (data) => {
  const res = await callAPIWithToken.post("/api/momo/updateorder", data);
  if (res & (res.status !== 200))
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
