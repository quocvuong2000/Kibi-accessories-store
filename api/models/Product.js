const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    product: { type: String },
    price: { type: String },
    idCate: { type: String },
    idBrand: { type: String },
    voucher: { type: String },
    topSales: { type: Boolean },
    totalRating: { type: Number },
    quantity : {type : Number},
    inStock : {type : Boolean},
    description : {type : String},
    images : {type : Array},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
