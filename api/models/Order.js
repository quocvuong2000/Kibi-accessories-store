const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
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
  status : {type : String},
  totalProduct: { type: Number },
  totalPrice: { type: Number },
  amount: { type: Number },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Order", OrderSchema);
