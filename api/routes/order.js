const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

//CREATE NEW ORDER
router.post("/create", async (req, res) => {
  //FIND LIST ITEM IN CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  //
  // let cartList = cartByUser.products;

  const newOrder = new Order({
    username: cartByUser.username,
    email: req.body.email,
    products: cartByUser.produts,
    totalProduct: req.body.totalProduct,
    totalPrice: cartByUser.totalPrice,
    address: req.body.address,
    status : "PENDING"
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});
//ACCEPT PENDING ORDER
router.patch("/accept/:id", async (req, res) => {
  //CHECK IF ORDER ALREADY EXISTS
  let id = req.params.id;
  const orderFound = Order.findById(id);
  !orderFound && res.status(404).json("Order not found");
  // let cartList = cartByUser.products;

  try {
    await Order.findByIdAndUpdate(id, {
      $set : {status : "DELIVERY"}
    },{ new : true})
    res.status(200).json("Update status success");
  } catch (err) {
    res.status(500).json(err);
  }
});
//REJECT PENDING ORDER
router.patch("/reject/:id", async (req, res) => {
  //CHECK IF ORDER ALREADY EXISTS
  let id = req.params.id;
  const orderFound = Order.findById(id);
  !orderFound && res.status(404).json("Order not found");
  // let cartList = cartByUser.products;

  try {
    await Order.findByIdAndUpdate(id, {
      $set : {status : "CANCELLED"}
    },{ new : true})
    res.status(200).json("Update status success");
  } catch (err) {
    res.status(500).json(err);
  }
});
//COMPLETED DELIVERY ORDER
router.patch("/complete/:id", async (req, res) => {
  //CHECK IF ORDER ALREADY EXISTS
  let id = req.params.id;
  const orderFound = Order.findById(id);
  !orderFound && res.status(404).json("Order not found");
  // let cartList = cartByUser.products;

  try {
    await Order.findByIdAndUpdate(id, {
      $set : {status : "COMPLETED"}
    },{ new : true})
    res.status(200).json("Update status success");
  } catch (err) {
    res.status(500).json(err);
  }
});