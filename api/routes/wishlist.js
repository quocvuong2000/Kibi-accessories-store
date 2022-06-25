const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Product = require("../models/Product");
//GET WISHLIST
router.get("/:username", verifyTokenAndAuthorization, async (req, res) => {
  const rs = await Wishlist.find({ username: req.params.username });
  !rs && res.status(401).json("Wrong credentials!");
  try {
    res.status(200).json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});

//ADD WISHLIST
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
  const productAdded = await Product.findById(req.body.productId);
  const user = await Wishlist.findOne({ username: req.body.username });
  if (!user) return res.status(404).json("Wishlist not generate");
  let wishList = user.products;
  const productFound = wishList.find((el) => el._id === req.body.productId);
  let wishListTemp = [];
  let newUpdate;
  console.log(productFound);
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
    wishListTemp = wishList;
    wishListTemp.push(newUpdate);
  }
  try {
    await Wishlist.findByIdAndUpdate(user.id, {
      products: wishListTemp,
    });
    res.status(200).json("Add success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//EXISTS
router.post("/exist", verifyTokenAndAuthorization, async (req, res) => {
  const user = await Wishlist.findOne({ username: req.body.username });
  if (!user) return res.status(404).json("Wishlist not generate");
  let wishList = user.products;
  const productFound = wishList.find((el) => el._id === req.body.productId);
  if (productFound !== undefined) {
    try {
      return res.status(201).json("Product already exist");
    } catch (error) {
      res.status(500).json(error);
    }
  }
  try {
    res.status(200).json("Not yet");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE WISHLIST
router.post("/delete", verifyTokenAndAuthorization, async (req, res) => {
  const user = await Wishlist.findOne({ username: req.body.username });
  if (!user) return res.status(404).json("user wishlist not generate");
  let wishList = user.products;
  const productFound = wishList.find((el) => el._id === req.body.productId);
  if (!productFound) return res.status(404).json("product not found");

  let wishListTemp = wishList.filter((el) => el._id !== req.body.productId);

  try {
    await Wishlist.findByIdAndUpdate(user.id, {
      products: wishListTemp,
    });
    res.status(200).json("delete success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
module.exports = router;
