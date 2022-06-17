const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    products: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wishlist", WishlistSchema);
