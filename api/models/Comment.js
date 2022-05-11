const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
  {
    userName: { type: String },
    content: { type: String },
    rating: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
