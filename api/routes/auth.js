const router = require("express").Router();
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
//REGISTER
router.post("/register", async (req, res) => {
  const userInfo = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.VUONG_SEC_PASS
    ).toString(),
    phone: req.body.phone,
    address: req.body.address,
    dob: req.body.dob,
    gender: req.body.gender,
    wards: req.body.wards,
    district: req.body.district,
    city: req.body.city,
    type: req.body.type,
  });
  const cartInfo = new Cart({
    username: req.body.username,
  });

  const wishListInfo = new Wishlist({
    username: req.body.username,
  });
  try {
    const register = await userInfo.save();
    await cartInfo.save();
    await wishListInfo.save();
    res.status(201).json(register);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).json("Wrong credentials!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.VUONG_SEC_PASS
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.password)
      return res.status(401).json("Wrong credentials!");

    const accessToken = jwt.sign(
      {
        id: user._id,
        type: user.type,
      },
      process.env.VUONG_SEC_PASS,
      { expiresIn: "1d" }
    );

    const { password, ...others } = user._doc;

    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
});

//LOGIN BY SOCIAL ACCOUNT
// {
//   "email" : "xxx@gmail.com"
// }
router.post("/social-account", async (req, res) => {
  const userFound = await User.findOne({ username: req.body.email });
  if (!userFound) {
    const newUserInfo = new User({
      username: req.body.email,
      email: req.body.email,
      type: "customer",
    });
    const cartInfo = new Cart({
      username: req.body.email,
    });
    try {
      await newUserInfo.save();
      await cartInfo.save();
      const accessToken = jwt.sign(
        {
          id: req.body.email,
          type: "customer",
        },
        process.env.VUONG_SEC_PASS,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } else {
    try {
      const accessToken = jwt.sign(
        {
          id: req.body.email,
          type: "customer",
        },
        process.env.VUONG_SEC_PASS,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ accessToken });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
});
module.exports = router;
