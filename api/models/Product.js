const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product: { type: String },
    price: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    voucher: { type: Number },
    topSales: { type: Boolean },
    totalRating: { type: Number },
    quantity: { type: Number },
    inStock: { type: Boolean },
    description: {
      content: { type: String },
      detail: { type: String },
      howToCare: { type: String },
      howToAdjust: { type: String },
      warrantyDetail: { type: String },
    },
    images: { type: Array },
    newStatus: { type: Boolean },
    sale: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
