const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//GET LIST CUSTOMER - PAGINATION
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const qPage = req.query.page;
    let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
    let page = qPage || 1;
    let count = 0;
    try {
      let customers;
      if (qPage) {
        customers = await User.find({
          type: "customer",
        })
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else {
        customers = await User.find();
      }
      count = await User.find({
        type: "customer",
      }).count();
      res.status(200).json({
        customers, // sản phẩm trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//UPDATE USER - CUSTOMER
router.put(
  "/update/user/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      try {
        const savedNew = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(savedNew);
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(504).json(error);
    }
  }
);

//GET DETAIL CUSTOMER
router.get("/detail/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      const customerFound = await User.findById(req.params.id);
      res.status(200).json(customerFound);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});
//UPDATE PASSWORD - CUSTOMER
router.patch(
  "/update/password/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const userFound = await User.findById(req.params.id);
      const hashedPassword = CryptoJS.AES.decrypt(
        userFound.password,
        process.env.VUONG_SEC_PASS
      );
      const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

      if (OriginalPassword !== req.body.oldpassword) {
        return res.status(202).json("Wrong password");
      }
      const newPassword = req.body.password;
      try {
        const savedNew = await User.findByIdAndUpdate(
          req.params.id,
          {
            password: CryptoJS.AES.encrypt(
              newPassword,
              process.env.VUONG_SEC_PASS
            ).toString(),
          },
          { new: true }
        );
        res.status(200).json(savedNew);
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(504).json(error);
    }
  }
);

//FORGOTPASSWORD

router.patch(
  "/update/forgotpassword/:email",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const newPassword = req.body.password;
      try {
        const savedNew = await User.findOneAndUpdate(
          { email: req.params.email },
          {
            password: CryptoJS.AES.encrypt(
              newPassword,
              process.env.VUONG_SEC_PASS
            ).toString(),
          },
          { new: true }
        );
        res.status(200).json(savedNew);
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(504).json(error);
    }
  }
);

module.exports = router;
