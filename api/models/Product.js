const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product: { type: String },
    price: { type: String },
    idCate: { type: String, required: true },
    idBrand: { type: String, required: true },
    voucher: { type: Number },
    topSales: { type: Boolean },
    totalRating: { type: Number },
    quantity: { type: Number },
    inStock: { type: Boolean },
    description: { type: String },
    images: { type: Array },
    newStatus: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
