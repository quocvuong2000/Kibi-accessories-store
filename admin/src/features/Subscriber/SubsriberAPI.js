import { callAPIWithToken } from "../../services/jwt-axios";

export const getSubscriberList = async (page) => {
  const res = await callAPIWithToken.get(`/api/subscribe/?page=${page}`);
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};

export const sendEmailToSubscriber = async (content) => {
  const res = await callAPIWithToken.post(`/api/subscribe/sendemail`, {
    content: content,
  });
  if (res && res.status !== 200) {
    throw Error("Something wrongs with code status" + res.status);
  }
  return res;
};
