import { message } from "antd";
import { useState } from "react";
import { addCart } from "../redux/apiCalls";
import { addCartSuccess } from "../redux/cartRedux";
import { callAPIWithToken } from "../services/jwt-axios";

export const getAllProductCart = async (user) => {
  const res = await callAPIWithToken.get(`/api/cart/${user}`);

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const handleAddToCart = async (dispatch, username, productId) => {
  addCart(dispatch, username, productId)
    .then((res) => {
      // setWrongCredential(false);
      message.success("Add success");
    })
    .finally(() => {
      getAllProductCart(username).then((res) => {
        dispatch(addCartSuccess(res));
      });
    })
    .catch((e) => {
      // setWrongCredential(true);
      throw e;
    });
};

export const downQty = async (username, productId) => {
  try {
    const res = await callAPIWithToken.post("/api/item/decrease", {
      username: user,
      productId: idProduct,
    });
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const upQty = async (username, productId) => {
  try {
    const res = await callAPIWithToken.post("/api/item/increase", {
      username: user,
      productId: idProduct,
    });
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};
