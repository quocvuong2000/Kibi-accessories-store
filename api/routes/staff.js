const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//GET LIST CUSTOMER - PAGINATION
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let staffs;
    if (qPage) {
      staffs = await User.find({
        type: "staff",
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      staffs = await User.find();
    }
    count = await User.find({
      type: "staff",
    }).count();
    res.status(200).json({
      staffs, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;