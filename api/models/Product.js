const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product: { type: String, unique : true },
    price: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand' },
    voucher: { type: Number },
    topSales: { type: Boolean },
    totalRating: { type: Number },
    quantity: { type: Number },
    inStock: { type: Boolean },
    description: { type: String },
    image: { type: String },
    subImage: { type: Array },
    newStatus: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
