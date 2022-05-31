const router = require("express").Router();
var CryptoJS = require("crypto-js");

const Product = require("../models/Product");

//ADD PRODUCT
router.post("/add", async (req, res) => {
  const pInfo = new User({
    product: req.body.name,
    price: req.body.price,
    idCate: req.body.idCate,
    idBrand: req.body.idBrand,
    voucher: req.body.voucher,
    topSales: req.body.topSales,
    totalRating: req.body.totalRating,
    quantity: req.body.quantity,
    inStock: req.body.inStock,
    description: req.body.description,
    images: req.body.images,
    newStatus: req.body.newStatus,
  });
  try {
    const addProduct = await pInfo.save();
    res.status(200).json(addProduct);
  } catch (error) {
    res.status(500).json(error);
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
      res.status(202).json(pKwrs);
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
      res.status(201).json(pCaters);
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
