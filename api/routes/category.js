const Category = require("../models/Category");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedCategory = await newCategory.save();
    res.status(200).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE - ONLY ADMIN AND STAFF
router.delete("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json("Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE - ONLY ADMIN AND STAFF
router.patch("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    console.log("req.params.id:", req.params.id);
    console.log("req.body.category:", req.body.category);
    await Category.findByIdAndUpdate(req.params.id, {
      category: req.body.category,
    });
    res.status(200).json("Category has been updated...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET - PAGINATION
// pagination
router.get("/", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let categories;
    if (qPage) {
      categories = await Category.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      categories = await Category.find();
    }
    count = await Category.count();
    res.status(200).json({
      categories, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
