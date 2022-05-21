const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, unique: true },
    qty: { type: Number },
    country: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
