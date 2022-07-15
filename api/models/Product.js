const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product: { type: String },
    price: { type: Number },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
    branchName: { type: String },
    voucher: { type: Number },
    topSales: { type: Boolean },
    totalRating: { type: Number },
    quantity: { type: Number },
    oldQuantity : {type : Number},
    inStock: { type: Boolean },
    warranty: { type: Number },
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
    tag: { type: Array },
    avgRating: { type: String, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
