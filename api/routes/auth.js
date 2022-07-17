const router = require("express").Router();
var CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const Viewed = require("../models/Viewed");
const Address = require("../models/Address");
//REGISTER
router.post("/register", async (req, res) => {
  try {
    const userInfo = new User({
      username: req.body.email,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.VUONG_SEC_PASS
      ).toString(),
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      dob: req.body.dob,
      gender: req.body.gender,
      wards: req.body.wards,
      district: req.body.district,
      city: req.body.city,
      type: req.body.type,
    });
    const userFound = await User.findOne({ email: req.body.email });
    if (userFound !== null && userFound !== undefined) {
      try {
        return res.status(201).json("Email already exist");
      } catch (error) {
        return res.status(501).json(error);
      }
    }
    const newAddress = {
      username: req.body.email,
      addressList: [
        {
          address: req.body.address,
          isDefault: true,
          recipientName: req.body.name,
          recipientPhone: req.body.phone,
          ward: req.body.wards,
          district: req.body.district,
          city: req.body.city,
        },
      ],
    };
    const createAddress = new Address(newAddress);
    // console.log("createAddress:", createAddress);
    const cartInfo = new Cart({
      username: req.body.email,
    });

    const wishListInfo = new Wishlist({
      username: req.body.email,
    });

    const viewedInfo = new Viewed({
      username: req.body.email,
    });
    try {
      const register = await userInfo.save();
      await createAddress.save();
      await cartInfo.save();
      await wishListInfo.save();
      await viewedInfo.save();
      res.status(200).json(register);
    } catch (error) {
      console.log("error:", error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
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
          role: user.role ? user.role : "none",
        },
        process.env.VUONG_SEC_PASS,
        { expiresIn: "1d" }
      );

      const { password, ...others } = user._doc;

      return res.status(200).json({ ...others, accessToken });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//LOGIN BY SOCIAL ACCOUNT
// {
//   "email" : "xxx@gmail.com"
// }
router.post("/social-account", async (req, res) => {
  try {
    const userFound = await User.findOne({ username: req.body.email });
    if (!userFound) {
      const newUserInfo = new User({
        username: req.body.email,
        email: req.body.email,
        name: req.body.name,
        avatar: req.body.avatar,
        type: "customer",
      });
      const cartInfo = new Cart({
        username: req.body.email,
      });
      const wishListInfo = new Wishlist({
        username: req.body.email,
      });
      const viewedInfo = new Viewed({
        username: req.body.email,
      });
      try {
        await newUserInfo.save();
        await cartInfo.save();
        await wishListInfo.save();
        await viewedInfo.save();
        const accessToken = jwt.sign(
          {
            id: req.body.email,
            type: "customer",
          },
          process.env.VUONG_SEC_PASS,
          { expiresIn: "1d" }
        );
        var info = {
          _id: newUserInfo._id,
          username: newUserInfo.username,
          name: newUserInfo.name,
          email: newUserInfo.email,
          type: newUserInfo.type,
          avatar: newUserInfo.avatar,
          createdAt: newUserInfo.createdAt,
          updatedAt: newUserInfo.updatedAt,
          __v: newUserInfo.__v,
          dob: newUserInfo.dob,
          gender: newUserInfo.gender,
          phone: newUserInfo.phone,
          accessToken: accessToken,
        };
        return res.status(200).json({ accessToken, info });
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

        var info = {
          _id: userFound._id,
          username: userFound.username,
          name: userFound.name,
          email: userFound.email,
          type: userFound.type,
          avatar: userFound.avatar,
          createdAt: userFound.createdAt,
          updatedAt: userFound.updatedAt,
          __v: userFound.__v,
          dob: userFound.dob,
          gender: newUserInfo.gender,
          phone: userFound.phone,
          accessToken: accessToken,
        };

        return res.status(200).json({ accessToken, info });
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.get("/exist/:email", async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.params.email });
    // console.log("userFound:", userFound);
    if (userFound) {
      return res.status(201).json("Exists");
    } else {
      try {
        return res.status(200).json("No exists");
      } catch (err) {
        return res.status(500).json({ error: err });
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});
module.exports = router;
