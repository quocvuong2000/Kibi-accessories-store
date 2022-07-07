const mongoose = require("mongoose");

const VoucherSchema = new mongoose.Schema(
  {
    voucherName: { type: String },
    username: { type: String },
    salePrice: { type: Number },
    duration: { type: String },
    expireDay: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Voucher", VoucherSchema);
