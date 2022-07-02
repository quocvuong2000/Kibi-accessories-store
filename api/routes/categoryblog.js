const CategoryBlog = require("../models/CategoryBlog");
const { verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategoryBlog = new CategoryBlog(req.body);

  try {
    const savedCategoryBlog = await newCategoryBlog.save();
    res.status(200).json(savedCategoryBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await CategoryBlog.findByIdAndDelete(req.params.id);
    res.status(200).json("CategoryBlog has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET

router.get("/", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 8; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let categories;
    if (qPage) {
      categories = await CategoryBlog.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      categories = await CategoryBlog.find();
    }
    count = await CategoryBlog.count();
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
//UPDATE
