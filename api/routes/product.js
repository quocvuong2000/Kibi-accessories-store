const router = require("express").Router();
const {
  verifyTokenAndStaff,
  verifyTokenAndProductStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const Viewed = require("../models/Viewed");
const Comment = require("../models/Comment");
const Cart = require("../models/Cart");
const { Query } = require("mongoose");
const Storage = require("../models/Storage");

//CREATE
router.post("/", verifyTokenAndProductStaff, async (req, res) => {
  try {
    try {
      const newProduct = new Product(req.body);
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//UPDATE - ONLY ADMIN AND STAFF
router.put("/update/:id", verifyTokenAndProductStaff, async (req, res) => {
  try {
    try {
      const currentBranchId = req.body.currentBranch;
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      const branchFound = updatedProduct.branches.find(
        (el) => el.branchId.toString() === currentBranchId
      );
      const status =
        branchFound.quantity > branchFound.oldQuantity ? "Import" : "Export";
      const newImport1 = {
        branchId: branchFound.branchId || "NA",
        productId: updatedProduct._id,
        newQuantity: branchFound.quantity,
        oldQuantity: branchFound.oldQuantity,
        branchName: branchFound.branchName || "NA",
        productName: updatedProduct.product,
        status: status,
      };
      await Storage(newImport1).save();
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE IN ALL BRANCH - ONLY ADMIN
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      const productFound = await Product.findById(req.body.id);
      productFound.branches.forEach(async (el) => {
        const newImport = {
          branchId: el.branchId || "NA",
          productId: updatedProduct._id,
          newQuantity: 0,
          oldQuantity: el.oldQuantity,
          branchName: el.branchName || "NA",
          productName: updatedProduct.product,
          status: "Export",
        };
        await Storage(newImport).save();
      });
      await Product.findByIdAndDelete(req.params.id);
      await Wishlist.deleteMany({ product: [{ _id: req.body.productId }] });
      await Viewed.deleteMany({ product: [{ _id: req.body.productId }] });
      await Comment.deleteMany({ productId: req.body.productId });
      await Cart.deleteMany({ product: [{ _id: req.body.productId }] });

      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE IN SPECIFICALLY BRANCH - ONLY ADMIN
router.put("/delete/branch/", verifyTokenAndAdmin, async (req, res) => {
  try {
    try {
      const productFound = await Product.findById(req.body.id);
      const branchFound = productFound.branches.find(
        (el) => el.branchId.toString() === req.body.branchId
      );
      const newImport = {
        branchId: branchFound.branchId || "NA",
        productId: productFound._id,
        newQuantity: 0,
        oldQuantity: branchFound.oldQuantity,
        branchName: branchFound.branchName || "NA",
        productName: productFound.product,
        status: "Export",
      };
      await Storage(newImport).save();
      let newBranches = [];
      if (productFound.branches.length > 0) {
        // console.log(req.body.branchId);
        newBranches = productFound.branches.filter(
          (el) => el.branchId.toString() !== req.body.branchId
        );
      }
      // console.log(newBranches);
      await Product.findByIdAndUpdate(req.body.id, {
        branches: newBranches,
      });
      res.status(200).json("Delete success");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET FILTER VIP - PAGINATION
router.get("/", async (req, res) => {
  try {
    try {
      const qPage = req.query.page;
      const qName = req.query.name;
      const qBrand = req.query.brand;
      const qFromPrice = req.query.fromPrice;
      const qToPrice = req.query.toPrice;
      const qRating = req.query.rating;
      const qBranch = req.query.branch;
      let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
      let page = qPage || 1;

      let count = 0;
      let query = qName ? { product: { $regex: qName, $options: "i" } } : {};
      if (qFromPrice && qToPrice) {
        query = {
          ...query,
          ...{
            price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) },
          },
        };
      }
      if (qBrand) {
        query = { ...query, ...{ brand: { $in: qBrand.split(",") } } };
      }
      if (qRating) {
        query = { ...query, ...{ avgRating: { $gte: parseInt(qRating) } } };
      }
      if (qBranch) {
        query = {
          ...query,
          ...{ branches: { $elemMatch: { branchId: qBranch } } },
        };
      }
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
  } catch (error) {
    res.status(504).json(error);
  }
});

router.get("/:idCate", async (req, res) => {
  try {
    try {
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
          ...{
            price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) },
          },
        };
      }
      if (qBrand) {
        query = { ...query, ...{ brand: { $in: qBrand.split(",") } } };
      }
      if (qRating) {
        query = { ...query, ...{ avgRating: { $gte: parseInt(qRating) } } };
      }

      if (req.params.idCate) {
        query = { ...query, ...{ category: req.params.idCate } };
      }
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
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET PRODUCT BY BRAND
router.get("/brand/:idBrand", async (req, res) => {
  try {
    try {
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
          ...{
            price: { $gte: parseInt(qFromPrice), $lte: parseInt(qToPrice) },
          },
        };
      }
      if (qBrand) {
        query = { ...query, ...{ brand: { $in: qBrand.split(",") } } };
      }
      if (qRating) {
        query = { ...query, ...{ avgRating: { $gte: parseInt(qRating) } } };
      }

      query = { ...query, ...{ brand: req.params.idBrand } };
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
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET LIMIT PRODUCT
router.get("/limit/:countlimit", async (req, res) => {
  try {
    try {
      const products = await Product.find().limit(req.params.countlimit);
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET PRODUCT BY NAME

//GET ALL
router.get("/getall/all", async (req, res) => {
  try {
    try {
      const products = await Product.find();
      res.status(200).json({
        products,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET PRODUCT BY ID -> DETAIL
router.get("/get/:id", async (req, res) => {
  try {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({ product });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
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
  try {
    try {
      const productRelated = await Product.find({
        category: req.params.id,
      }).count();
      res.status(200).json(productRelated);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
