const mongoose = require("mongoose");

const CategoryBlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CategoryBlog", CategoryBlogSchema);
