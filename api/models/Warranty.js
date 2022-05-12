const mongoose = require("mongoose");

const Warranty = new mongoose.Schema(
  {
    userId: { type: String },
    userName: { type: String },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Warranty", Warranty);
