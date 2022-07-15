const mongoose = require("mongoose");

const StorageSchema = new mongoose.Schema(
  {
    branchId: { type: String, required: true },
    productId: { type: String, required: true },
    newQuantity: { type: Number, required: true },
    oldQuantity: { type: Number },
    branchName: { type: String },
    productName: { type: String },
    status: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Storage", StorageSchema);
