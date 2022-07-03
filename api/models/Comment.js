const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    username: { type: String, required: true },
    productId: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number },
    name: { type: String },
    avatar: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
