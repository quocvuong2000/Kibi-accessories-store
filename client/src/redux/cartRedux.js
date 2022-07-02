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
    getNumber: (state, action) => {
      state.numberCart = action.payload.products.length;
      state.totalPrice = action.payload.totalPrice;
    },
    addStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.numberCart = action.payload.products.length;
      state.totalPrice = action.payload.totalPrice;
    },

    deleteStart: (state) => {
      state.isFetching = true;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state.numberCart = action.payload.products.length;
      state.totalPrice = 0;
      state.totalPrice = action.payload.totalPrice;
    },

    increaseStart: (state) => {
      state.isFetching = true;
    },
    increaseCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },

    decreaseStart: (state) => {
      state.isFetching = true;
    },
    decreaseCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
    },
    deleteAllCart: (state, action) => {
      state.isFetching = false;
      state._products = [];
      state.totalPrice = 0;
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
  getNumber,
  deleteAllCart
} = cartSlice.actions;
export default cartSlice.reducer;
