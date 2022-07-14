const Storage = require("../models/Storage");
const { verifyTokenAndStaff } = require("./verifyToken");
const router = require("express").Router();

router.get("/", verifyTokenAndStaff, async (req, res) => {
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;

  try {
    const branches = await Storage.find()
      .skip(perPage * page - perPage)
      .limit(perPage);
      count = await Product.find(query).count();
      res.status(200).json({
        branches, // sản phẩm trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
