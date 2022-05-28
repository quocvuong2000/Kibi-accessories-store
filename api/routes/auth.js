const router = require("express").Router();
var CryptoJS = require("crypto-js");

const User = require("../models/User");

//REGISTER
router.post("/register", async (req, res) => {
  const userInfo = new User({
    username: req.body.username,
    password: req.body.password,
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

//LOGIN
router.post("/login", async (req, res) => {
  const userInfo = await User.findOne({
    username: req.body.username,
  });
  if (userInfo) {
    if (userInfo.password === req.body.password) {
      try {
        res.status(200).json(userInfo);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json({
        text: "Thông tin không hợp lệ",
      });
    }
  } else {
    res.status(401).json({
      text: "Thông tin không hợp lệ",
    });
  }
});

module.exports = router;
