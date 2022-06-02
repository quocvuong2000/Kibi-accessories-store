const router = require("express").Router();
var CryptoJS = require("crypto-js");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE - ONLY ADMIN AND STAFF
router.put("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});
//DELETE - ONLY ADMIN AND STAFF
router.delete("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET PRODUCT
router.get("/", async (req, res) => {
  const pInfo = await Product.find();
  const pKw = req.query.kw;
  const pCate = req.query.idCate;
  const pBrand = req.query.idBrand;

  //SEARCH
  if (pKw) {
    const pKwrs = await Product.find({
      product: pKw,
    });
    try {
      res.status(200).json(pKwrs);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //PRODUCTS BY CATEGORY
  if (pCate) {
    const pCaters = await Product.find({
      idCate: pCate,
    });
    try {
      res.status(200).json(pCaters);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  try {
    res.status(200).json(pInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET PRODUCT BY ID -> DETAIL
router.get("/:id", async (req, res) => {
  const pInfo = await Product.findById(req.params.id);
  try {
    res.status(201).json(pInfo);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
