const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  username: { type: String, required: true },
  products: [
    {
      _id: false,
      productId: { type: String },
      productName: { type: String },
      productImage: { type: Array },
      productPrice: { type: Number },
      quantity: { type: Number },
      branches: { type: Array },
    },
  ],
  totalPrice: { type: Number },
});

module.exports = mongoose.model("Cart", CartSchema);
