const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String },
    products: [
      {
        _id: false,
        productId: { type: String },
        productName: { type: String },
        productImage: { type: Array },
        productPrice: { type: Number },
        quantity: { type: Number },
      },
    ],
    status: { type: String },
    totalProduct: { type: Number },
    totalPrice: { type: Number },
    shippingPrice: { type: Number },
    amount: { type: Number },
    address: { type: String },
    recipientName: { type: String },
    recipientPhone: { type: Number, required: true },
    paid: { type: Boolean },
    branchId: { type: String },
    branchName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
