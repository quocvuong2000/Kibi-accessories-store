const router = require("express").Router();
const { verifyTokenAndStaff } = require("./verifyToken");
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

//GET - PAGINATION
router.get("/", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let products;
    if (qPage) {
      products = await Product.find()
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      products = await Product.find();
    }
    count = await Product.count();
    res.status(200).json({
      products, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:idCate", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let products;
    if (qPage) {
      products = await Product.find({ category: req.params.idCate })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      products = await Product.find({ category: req.params.idCate });
    }
    count = await Product.count();
    res.status(200).json({
      products, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT BY BRAND

router.get("/brand/:idBrand", async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let products;
    if (qPage) {
      products = await Product.find({ brand: req.params.idBrand })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      products = await Product.find({ brand: req.params.idBrand });
    }
    count = await Product.count();
    res.status(200).json({
      products, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LIMIT PRODUCT
router.get("/limit/:countlimit", async (req, res) => {
  const products = await Product.find().limit(req.params.countlimit);
  try {
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error);
  }
});

//SEARCH
router.get("/search/:kw", async (req, res) => {
  const products = await Product.find({
    product: { $regex: req.params.kw, $options: "i" },
  });
  try {
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET PRODUCT BY ID -> DETAIL
router.get("/get/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  try {
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
