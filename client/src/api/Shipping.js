import { jwtAxios } from "../services/jwt-axios";
import axios from "axios";

export const getProvince = async (token) => {
  const res = await axios.get(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
    {
      headers: {
        token: token,
      },
    }
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
export const getDistrict = async (token, provinceId) => {
  const res = await axios.get(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/district",
    {
      headers: {
        token: token,
      },
      params: { province_id: provinceId },
    }
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getWard = async (token, districtId) => {
  const res = await axios.get(
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    {
      headers: {
        token: token,
      },
      params: { district_id: districtId },
    }
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
