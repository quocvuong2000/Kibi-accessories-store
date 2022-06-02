const router = require("express").Router();

const Cart = require("../models/Cart");

//ADD CART
router.post("/add", async (req, res) => {
  const pInfo = new Cart({
    product: [req.body.id, req.body.qty],
    username: req.body.username,
  });
  try {
    const addCart = await pInfo.save();
    res.status(200).json(addCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET CART
router.get("/", async (req, res) => {
  const rs = await Cart.find(req.body.username);
  !rs && res.status(401).json("Wrong credentials!");
  try {
    res.status(200).json(rs);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
