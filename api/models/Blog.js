const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String },
    user: [
      {
        userId: { type: String },
      },
    ],
    categoryblog: { type: mongoose.Schema.Types.ObjectId, ref: "CategoryBlog" },
    isBrowse: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
