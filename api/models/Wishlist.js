const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    products: [
      {
        _id: false,
        productId: { type: String },
        product: { type: String },
        images: { type: Array },
        price: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
