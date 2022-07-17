import { callAPIWithToken } from "../../services/jwt-axios";
import axios from "axios";
import { async } from "@firebase/util";
const token = "58995546-f558-11ec-8636-7617f3863de9";

export const getProvince = async () => {
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
export const getDistrict = async (provinceId) => {
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

export const getWard = async (districtId) => {
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

const apiKey = "  ";
export const getLatLong = async (address) => {
  const res = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const addNewBranch = async (
  districtId,
  wardId,
  cityId,
  address,
  shopId
) => {
  const res = await callAPIWithToken.post("/api/branch/", {
    districtId: districtId,
    wardId: wardId,
    cityId: cityId,
    address: address,
    shopId: shopId,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const updateBranch = async (
  districtId,
  wardId,
  cityId,
  address,
  shopId,
  id
) => {
  const res = await callAPIWithToken.patch(`/api/branch/${id}`, {
    districtId: districtId,
    wardId: wardId,
    cityId: cityId,
    address: address,
    shopId: shopId,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const addNewBranchToGhn = async (districtId, wardId, address) => {
  var data = {
    district_id: districtId,
    ward_code: wardId,
    address: address,
    name: "Tin1123",
    phone: "0348098023",
  };
  const res = await axios({
    method: "post",
    url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shop/register",
    headers: {
      Token: token,
      "Content-Type": "application/json",
    },
    data: data,
  });
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const getBranches = async (page) => {
  const res = await callAPIWithToken.get(`/api/branch/?page=${page}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const deleteBranch = async (id) => {
  const res = await callAPIWithToken.delete(`/api/branch/${id}`);
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};
