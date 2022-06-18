const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("./verifyToken");
const Product = require("../models/Product");
//GET WISHLIST
router.get("/:username", async (req, res) => {
  const wishlist = await Wishlist.find({ username: req.params.username });
  try {
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json(error);
  }
});

//ADD WISHLIST
router.post("/", async (req, res) => {
  const productAdded = await Product.findById(req.body.productId);
  const user = await Wishlist.findOne({ username: req.body.username });
  if (!user) return res.status(404).json("Wishlist not generate");

  let wishList = user.products;

  if (wishList.length === 0) {
    try {
      await Wishlist.findByIdAndUpdate(user.id, {
        products: [
          {
            productId: productAdded.id,
            product: productAdded.product,
            price: productAdded.price,
            images: productAdded.images[0],
          },
        ],
      });
      res.status(200).json("update success");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    try {
      res.status(201).json("Product already exists");
    } catch (error) {
      res.status(500).json(error);
    }
  }
});

module.exports = router;
