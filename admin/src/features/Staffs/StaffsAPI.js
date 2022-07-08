import { callAPIWithToken } from "../../services/jwt-axios";

export const doGetstaffList = async (page) => {
  const res = await callAPIWithToken({
    url: `/api/staff`,
    params: {
      page,
    },
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
