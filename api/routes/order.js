const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

//CREATE NEW ORDER
router.post("/create", async (req, res) => {
  //FIND LIST ITEM IN CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  const newOrder = new Order({
    userName: cartByUser.username,
    email: req.body.email,
    products: cartByUser.produts,
    totalProduct: req.body.totalProduct,
    totalPrice: req.body.totalPrice,
    amount: req.body.amount,
    address: req.body.address,
  });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
