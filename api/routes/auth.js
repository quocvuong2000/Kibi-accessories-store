const router = require("express").Router();
var CryptoJS = require("crypto-js");

const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  const userInfo = new User({
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.VUONG_SEC_PASS
    ),
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    dob: req.body.dob,
    gender: req.body.gender,
    wards: req.body.wards,
    district: req.body.district,
    city: req.body.city,
  });
  try {
    const register = await userInfo.save();
    res.status(201).json(register);
  } catch (error) {
    res.status(500).json(error);
  }
});
