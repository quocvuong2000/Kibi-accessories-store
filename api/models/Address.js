const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    street: { type: String },
    ward: { type: String },
    district: { type: String },
    city: { type: String },
    user: [
      {
        userId: { type: String, required: true },
      },
    ],
    fullAddress: { type: String },
    default: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
