const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const { verifyToken } = require("./verifyToken");

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
  const newItem = new Wishlist(req.body);
  try {
    const wishlist = await newItem.save();
    res.status(200).json({ wishlist });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
