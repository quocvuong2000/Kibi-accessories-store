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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", BlogSchema);
