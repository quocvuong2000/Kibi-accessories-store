import { callAPIWithToken, jwtAxios } from "../services/jwt-axios";
import {
  addStart,
  decreaseStart,
  deleteStart,
  increaseStart,
} from "./cartRedux";
import { loginStart } from "./userRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await jwtAxios.post("/api/auth/login", user);
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addCart = async (dispatch, user, idProduct) => {
  dispatch(addStart());
  try {
    const res = await callAPIWithToken.post("/api/cart/add", {
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

export const deleteProductCart = async (dispatch, username, productId) => {
  dispatch(deleteStart());
  try {
    const res = await callAPIWithToken.post("/api/cart/delete", {
      username: username,
      productId: productId,
    });
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const increaseQty = async (dispatch, username, productId) => {
  dispatch(increaseStart());
  try {
    const res = await callAPIWithToken.post("/api/cart/item/increase", {
      username: username,
      productId: productId,
    });
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const decreaseQty = async (dispatch, username, productId) => {
  dispatch(decreaseStart());
  try {
    const res = await callAPIWithToken.post("/api/cart/item/decrease", {
      username: username,
      productId: productId,
    });
    if (res && res.status !== 200)
      throw Error("Something wrongs with code status" + res.status);
    return res.data;
  } catch (error) {
    throw error;
  }
};
