const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    products: [
      {
        _id: { type: String },
        product: { type: String },
        images: { type: Array },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
