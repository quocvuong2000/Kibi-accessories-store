import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },

  reducers: {
    addProduct: (state, action) => {
      var check = 0;
      for (var i = 0; i < state.products.length; i++) {
        console.log(state.products[i]);
      }

      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.product.price * action.payload.quantity;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
