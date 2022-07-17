const CategoryBlog = require("../models/CategoryBlog");
const Category = require("../models/Category");
const {
  verifyTokenAndStaff,
  verifyTokenAndBlogStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndBlogStaff, async (req, res) => {
  try {
    const newCategory = new CategoryBlog(req.body);

    try {
      const savedCategory = await newCategory.save();
      res.status(200).json(savedCategory);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE - ONLY ADMIN AND STAFF
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      await Category.deleteMany({ categoryblog: req.params.id });
      await CategoryBlog.findByIdAndDelete(req.params.id);
      res.status(200).json("Category has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//UPDATE - ONLY ADMIN AND STAFF
router.patch("/:id", verifyTokenAndBlogStaff, async (req, res) => {
  try {
    try {
      await CategoryBlog.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
      });
      res.status(200).json("Category has been updated...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET - PAGINATION
// pagination
router.get("/", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(504).json(error);
  }
});

//CREATE
router.get("/:id", async (req, res) => {
  try {
    try {
      const cate = await CategoryBlog.findById(req.params.id);
      res.status(200).json({ cate });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
