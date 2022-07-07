import { jwtAxios } from "../services/jwt-axios";
import axios from "axios";
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

export const getInfoService = async (from, to) => {
  const res = await axios.get(
    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
    {
      headers: {
        token: token,
      },
      params: {
        shop_id: process.env.REACT_APP_SHOP_ID,
        from_district: from,
        to_district: to,
      },
    }
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getShippingCost = async (
  service_id,
  insurance_value,
  coupon,
  to_ward_code,
  to_district_id,
  from_district_id,
  weight,
  length,
  width,
  height
) => {
  const res = await axios.get(
    "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
    {
      headers: {
        token: token,
        shop_id: process.env.REACT_APP_SHOP_ID,
      },
      params: {
        service_id: service_id,
        insurance_value: insurance_value,
        coupon: coupon,
        from_district_id: from_district_id,
        to_district_id: to_district_id,
        to_ward_code: to_ward_code,
        height: height,
        length: length,
        weight: weight,
        width: width,
      },
    }
  );
  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};

export const getLeadTime = async (todistrict, toward, serviceid) => {
  var data = {
    from_district_id: 1450,
    to_district_id: parseInt(todistrict),
    to_ward_code: `${toward}`,
    from_ward_code: "20804",
    service_id: serviceid,
  };
  const res = await axios({
    method: "post",
    url: "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
    headers: {
      token: token,
      shop_id: process.env.REACT_APP_SHOP_ID,
      "Content-Type": "application/json",
    },
    data: data,
  });

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res;
};
