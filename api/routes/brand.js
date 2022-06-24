const Brand = require("../models/Brand");
const {
  verifyTokenAndStaff,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newBrand = new Brand(req.body);

  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET - PAGINATION
// pagination
router.get("/", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let brands;
    if (qPage) {
      brands = await Brand.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      brands = await Brand.find();
    }
    count = await Brand.count();
    res.status(200).json({
      brands, // sản phẩm trên một page
      currentPage: parseInt(page), // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
