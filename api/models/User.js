const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    address: { type: String },
    dob: { type: String },
    gender: { type: String },
    wards: { type: String },
    district: { type: String },
    city: { type: String },
    type: { type: String, required: true },
    idGoogle: { type: String, unique: true },
    idFacebook: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
