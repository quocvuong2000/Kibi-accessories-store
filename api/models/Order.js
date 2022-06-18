const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  userName: { type: String, required: true },
  email: { type: String },
  products: [
    {
      productId: { type: String },
      productName: { type: String },
      productPrice: { type: Number },
      quantity: { type: Number },
      voucher: { type: Number },
    },
  ],
  totalProduct: { type: Number },
  totalPrice: { type: Number },
  amount: { type: Number },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
