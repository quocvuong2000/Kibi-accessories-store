const Brand = require("../models/Brand");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const Viewed = require("../models/Viewed");
const Comment = require("../models/Comment");
const Cart = require("../models/Cart");
const { verifyTokenAndStaff, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  try {
    const newBrand = new Brand(req.body);

    try {
      const savedBrand = await newBrand.save();
      res.status(200).json(savedBrand);
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
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      const productFound = await Product.find({ brand: req.params.id });

      productFound.forEach((el) => {
        Wishlist.deleteMany({
          product: [{ _id: el._id }],
        });
        Viewed.deleteMany({ product: [{ _id: el._id }] });
        Comment.deleteMany({ productId: el._id });
        Cart.deleteMany({ product: [{ _id: el._id }] });
      });
      await Product.deleteMany({ brand: req.params.id });
      await Brand.findByIdAndDelete(req.params.id);
      res.status(200).json("Delete brand and all product related success");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.get("/limit/:count", async (req, res) => {
  try {
    try {
      const brands = await Brand.find().limit(req.params.count);
      res.status(200).json({
        brands,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedBrand);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
