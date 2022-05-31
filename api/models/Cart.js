const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  username: { type: String, required: true },
});

module.exports = mongoose.model("Cart", CartSchema);
