const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    username: { type: String, required: true },
    comments: [
      {
        productId: { type: String, required: true },
        commentList: [
          {
            content: { type: String },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
