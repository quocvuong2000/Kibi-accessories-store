const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, unique: true },
    country: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", BrandSchema);
