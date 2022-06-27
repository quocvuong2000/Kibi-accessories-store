const router = require("express").Router();
const User = require("../models/User");
const { verifyToken } = require("./verifyToken");

//GET - PAGINATION
router.get("/", async (req, res) => {
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
});

module.exports = router;
