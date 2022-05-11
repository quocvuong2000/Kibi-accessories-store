const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", BrandSchema);
