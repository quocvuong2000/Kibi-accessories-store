const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    productId: { type: String, required: true },
    quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
