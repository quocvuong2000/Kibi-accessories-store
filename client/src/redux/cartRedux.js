import { createSlice } from "@reduxjs/toolkit";
import { setAuthToken } from "../services/jwt-axios";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isFetching: false,
    numberCart: 0,
    Carts: [],
    _products: [],
    totalPrice: 0,
  },

  reducers: {
    addStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.numberCart = action.payload.products.length;
      state.totalPrice = 0;
      state._products.forEach((value, index, array) => {
        state.totalPrice += value.productPrice * value.quantity;
      });
    },

    deleteStart: (state) => {
      state.isFetching = true;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state.numberCart = action.payload.products.length;
      state.totalPrice = 0;
      state._products.forEach((value, index, array) => {
        state.totalPrice += value.productPrice * value.quantity;
      });
    },

    increaseStart: (state) => {
      state.isFetching = true;
    },
    increaseCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.totalPrice = 0;
      state._products.forEach((value, index, array) => {
        state.totalPrice += value.productPrice * value.quantity;
      });
    },

    decreaseStart: (state) => {
      state.isFetching = true;
    },
    decreaseCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.totalPrice = 0;
      state._products.forEach((value, index, array) => {
        state.totalPrice += value.productPrice * value.quantity;
      });
    },
  },
});

export const {
  addStart,
  addCartSuccess,
  deleteStart,
  deleteCartSuccess,
  increaseStart,
  increaseCartSuccess,
  decreaseStart,
  decreaseCartSuccess,
} = cartSlice.actions;
export default cartSlice.reducer;
