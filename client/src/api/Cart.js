import { message } from "antd";
import { useState } from "react";
import {
  addCart,
  decreaseQty,
  deleteProductCart,
  increaseQty,
  overrideCart,
} from "../redux/apiCalls";
import {
  addCartSuccess,
  decreaseCartSuccess,
  deleteCartSuccess,
  increaseCartSuccess,
  overrideCartSuccess,
} from "../redux/cartRedux";
import { callAPIWithToken } from "../services/jwt-axios";

export const getAllProductCart = async (user) => {
  const res = await callAPIWithToken.get(`/api/cart/${user}`);

  if (res && res.status !== 200)
    throw Error("Something wrongs with code status" + res.status);
  return res.data;
};

export const handleAddToCart = async (
  dispatch,
  username,
  productId,
  quantity
) => {
  addCart(dispatch, username, productId, quantity)
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

export const deleteCart = async (dispatch, username, productId) => {
  deleteProductCart(dispatch, username, productId)
    .then((res) => {
      // setWrongCredential(false);
      message.success("Delete success");
    })
    .finally(() => {
      getAllProductCart(username).then((res) => {
        dispatch(deleteCartSuccess(res));
      });
    })
    .catch((e) => {
      // setWrongCredential(true);
      throw e;
    });
};

export const downQty = async (dispatch, username, productId) => {
  decreaseQty(dispatch, username, productId)
    .then((res) => {})
    .finally(() => {
      getAllProductCart(username).then((res) => {
        dispatch(decreaseCartSuccess(res));
      });
    })
    .catch((e) => {
      throw e;
    });
};

export const upQty = async (dispatch, username, productId) => {
  increaseQty(dispatch, username, productId)
    .then((res) => {})
    .finally(() => {
      getAllProductCart(username).then((res) => {
        dispatch(increaseCartSuccess(res));
      });
    })
    .catch((e) => {
      throw e;
    });
};

// export const deleteProductCart = async (username, productId) => {
//   try {
//     const res = await callAPIWithToken.post("/api/cart/delete", {
//       username: username,
//       productId: productId,
//     });
//     if (res && res.status !== 200)
//       throw Error("Something wrongs with code status" + res.status);
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// };
