const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String },
    email: { type: String, required: true },
    phone: { type: String, default: 0 },
    address: { type: String },
    dob: { type: String },
    gender: { type: String },
    wards: { type: String },
    district: { type: String },
    city: { type: String },
    type: { type: String, required: true },
    role: { type: String },
    avatar: { type: String },
    isSocial: { type: Boolean, default: false },
    // idGoogle: { type: String, unique: true },
    // idFacebook: { type: String, unique: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
