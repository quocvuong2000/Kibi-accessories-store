const mongoose = require("mongoose");

const ViewedSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    products: [
      {
        _id: { type: String },
        product: { type: String },
        images: { type: Array },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Viewed", ViewedSchema);
