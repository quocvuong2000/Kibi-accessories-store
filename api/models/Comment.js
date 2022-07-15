const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    username: { type: String, required: true },
    productId: { type: String, required: true },
    comment: { type: String },
    rating: { type: Number },
    name: { type: String },
    avatar: { type: String },
    productImage: { type: String },
    productName: { type: String },
    countLike: { type: Number },
    commentReply: [
      {
        username: { type: String },
        name: { type: String },
        avatar: { type: String },
        replyContent: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
