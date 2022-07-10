const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String },
    user: [
      {
        userId: { type: String },
      },
    ],
    author: { type: String },
    categoryblog: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryBlog" },
    status: { type: String },
    categoryname: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
