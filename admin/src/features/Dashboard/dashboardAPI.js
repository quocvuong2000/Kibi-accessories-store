import { callAPIWithToken } from "../../services/jwt-axios";

export const doGetChartData = async () => {
  const res = await callAPIWithToken.get("/api/order/chart");
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getRecentOrders = async () => {
  const res = await callAPIWithToken.get("/api/order/dashboard");
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
