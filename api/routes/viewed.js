const router = require("express").Router();
const Viewed = require("../models/Viewed");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Product = require("../models/Product");
//GET Viewed
router.get("/:username", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const rs = await Viewed.find({ username: req.params.username });
    !rs && res.status(401).json("Wrong credentials!");
    try {
      res.status(200).json(rs);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//ADD Viewed
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      const productAdded = await Product.findById(req.body.productId);
      const user = await Viewed.findOne({ username: req.body.username });
      if (!user) return res.status(404).json("Viewed not generate");
      let viewedList = user.products;
      const productFound = viewedList.find(
        (el) => el._id === req.body.productId
      );
      let viewedListTemp = [];
      let newUpdate;
      if (productFound !== undefined) {
        try {
          return res.status(201).json("Product already exist");
        } catch (error) {
          res.status(500).json(error);
        }
      } else {
        newUpdate = {
          _id: productAdded.id,
          product: productAdded.product,
          price: productAdded.price,
          images: productAdded.images[0],
        };
        viewedListTemp = viewedList;
        viewedListTemp.push(newUpdate);
      }
      try {
        await Viewed.findByIdAndUpdate(user.id, {
          products: viewedListTemp,
        });
        res.status(200).json("Add success");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE VIEWED
router.post("/delete", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await Viewed.findOne({ username: req.body.username });
    if (!user) return res.status(404).json("user wishlist not generate");
    try {
      await Viewed.findByIdAndUpdate(user.id, {
        products: [],
      });
      res.status(200).json("delete success");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});
module.exports = router;
