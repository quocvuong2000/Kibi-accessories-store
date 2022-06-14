const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    user: [
      {
        userId: { type: String, required: true },
      },
    ],
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
