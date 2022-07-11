const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    districtId: { type: Number },
    wardId: { type: String },
    cityId: { type: Number },
    lat: { type: String },
    long: { type: String },
    address: { type: String },
    shopId: { type: Number },
    isDefault: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Branch", BranchSchema);
