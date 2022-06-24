const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema(
  {
    username: { type: String },
    addressList: [
      {
        address: { type: String },
        street: { type: String },
        ward: { type: String },
        district: { type: String },
        city: { type: String },
        isDefault: { type: Boolean },
        recipientName: { type: String },
        recipientPhone: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", AddressSchema);
