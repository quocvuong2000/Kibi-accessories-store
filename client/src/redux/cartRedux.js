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
      state.numberCart = action.payload.length;
    },
  },
});

export const { addStart, addCartSuccess } = cartSlice.actions;
export default cartSlice.reducer;
