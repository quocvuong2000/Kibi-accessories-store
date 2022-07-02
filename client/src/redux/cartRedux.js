import { createSlice } from "@reduxjs/toolkit";
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
    overrideStart: (state) => {
      state.isFetching = true;
    },
    overrideCartSuccess: (state, action) => {
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
  overrideStart,
  overrideCartSuccess
} = cartSlice.actions;
export default cartSlice.reducer;
