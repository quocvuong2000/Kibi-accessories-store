const router = require("express").Router();
const {
  verifyTokenAndStaff,
  verifyTokenAndProductStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");
const { Query } = require("mongoose");

//CREATE
router.post("/", verifyTokenAndProductStaff, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE - ONLY ADMIN AND STAFF
router.put("/update/:id", verifyTokenAndProductStaff, async (req, res) => {
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

//DELETE - ONLY ADMIN
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
    await Wishlist.deleteMany({ product: [{ _id: req.body.productId }] });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET - PAGINATION
router.get("/", async (req, res) => {
  const qPage = req.query.page;
  const qName = req.query.name;
  const qBrand = req.query.brand;
  const qFromPrice = req.query.fromPrice;
  const qToPrice = req.query.toPrice;
  const qRating = req.query.rating;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;

  let count = 0;
  let query = qName ? { product: { $regex: qName, $options: "i" } } : {};
  if (qFromPrice && qToPrice) {
    query = {
      ...query,
      ...{ price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) } },
    };
  }
  if (qBrand) {
    query = { ...query, ...{ brand: qBrand } };
  }
  if (qRating) {
    query = { ...query, ...{ avgRating: { $gt: parseInt(qRating) } } };
  }

  try {
    let products;
    products = await Product.find(query)
      .skip(perPage * page - perPage)
      .limit(perPage);

    count = await Product.find(query).count();
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
  const qName = req.query.name;
  const qBrand = req.query.brand;
  const qFromPrice = req.query.fromPrice;
  const qToPrice = req.query.toPrice;
  const qRating = req.query.rating;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;

  let query = qName ? { product: { $regex: qName, $options: "i" } } : {};
  if (qFromPrice && qToPrice) {
    query = {
      ...query,
      ...{ price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) } },
    };
  }
  if (qBrand) {
    query = { ...query, ...{ brand: qBrand } };
  }
  if (qRating) {
    query = { ...query, ...{ avgRating: { $gt: parseInt(qRating) } } };
  }

  query = { ...query, ...{ category: req.params.idCate } };
  // console.log("qFromPrice:", qFromPrice);
  // console.log("query:", query);
  try {
    let products;
    if (qPage) {
      products = await Product.find(query)
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      products = await Product.find(query);
    }
    count = await Product.find(query).count();
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
  const qName = req.query.name;
  const qBrand = req.query.brand;
  const qFromPrice = req.query.fromPrice;
  const qToPrice = req.query.toPrice;
  const qRating = req.query.rating;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;

  let query = qName ? { product: { $regex: qName, $options: "i" } } : {};
  if (qFromPrice && qToPrice) {
    query = {
      ...query,
      ...{ price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) } },
    };
  }
  if (qBrand) {
    query = { ...query, ...{ brand: qBrand } };
  }
  if (qRating) {
    query = { ...query, ...{ avgRating: { $gt: parseInt(qRating) } } };
  }

  query = { ...query, ...{ brand: req.params.idBrand } };
  try {
    let products;
    if (qPage) {
      products = await Product.find(query)
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      products = await Product.find(query);
    }
    count = await Product.find(query).count();
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

//GET ALL
router.get("/getall/all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      products,
    });
  } catch (err) {
    res.status(500).json(err);
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

//GET AMOUNT PRODUCT BY BRAND -> DETAIL
// router.get("/brand/:id", async (req, res) => {
//   const productRelated = await Product.find({
//     brand : req.params.id
//   }).count();
//   try {
//     res.status(200).json(productRelated);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
//GET AMOUNT PRODUCT BY category -> DETAIL
router.get("/category/:id", async (req, res) => {
  const productRelated = await Product.find({
    category: req.params.id,
  }).count();
  try {
    res.status(200).json(productRelated);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
