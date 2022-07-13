const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndStaff,
} = require("./verifyToken");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

//CREATE NEW ORDER WITH COD METHOD
router.post("/create", async (req, res) => {
  //FIND LIST ITEM IN CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  //
  // let cartList = cartByUser.products;

  const newOrder = new Order({
    username: cartByUser.username,
    email: req.body.email,
    products: cartByUser.products,
    totalProduct: req.body.totalProduct,
    totalPrice: req.body.totalPrice,
    address: req.body.address,
    recipientName: req.body.recipientName,
    recipientPhone: req.body.recipientPhone,
    shippingPrice: req.body.shippingPrice,
    status: "PENDING",
    paid: false,
    branchId: req.body.branchId,
    branchName: req.body.branchName,
    amount: req.body.amount,
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
    await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: "DELIVERY" },
      },
      { new: true }
    );
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
    await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: "CANCELLED" },
      },
      { new: true }
    );
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
    await Order.findByIdAndUpdate(
      id,
      {
        $set: { status: "COMPLETED" },
      },
      { new: true }
    );
    res.status(200).json("Update status success");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL

//GET ORDER BY STATUS
router.get("/status/get", async (req, res) => {
  const qPage = req.query.page;
  const qStatus = req.query.status;
  let page = qPage || 1;
  let perPage = 5;
  let count = 0;

  try {
    let orders;
    if (qPage) {
      if (qStatus === "PENDING") {
        orders = await Order.find({ status: "PENDING" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({ status: "PENDING" }).count();
      }
      if (qStatus === "DELIVERY") {
        orders = await Order.find({ status: "DELIVERY" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({ status: "DELIVERY" }).count();
      }
      if (qStatus === "COMPLETED") {
        orders = await Order.find({ status: "COMPLETED" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({ status: "COMPLETED" }).count();
      }
      if (qStatus === "CANCELLED") {
        orders = await Order.find({ status: "CANCELLED" })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({ status: "CANCELLED" }).count();
      }
    }
    res.status(200).json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDER BY STATUS AND USER
router.get("/customer/status/get", async (req, res) => {
  const qPage = req.query.page;
  const qStatus = req.query.status;
  const qUser = req.query.username;
  let page = parseInt(qPage) || 1;
  let perPage = 5;
  let count = 0;
  let totalPages = 1;
  try {
    let orders;
    if (qPage) {
      if (qStatus === "PENDING") {
        orders = await Order.find({ status: "PENDING", username: qUser })
          .sort({ createdAt: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({
          status: "PENDING",
          username: qUser,
        }).count();
      }
      if (qStatus === "DELIVERY") {
        orders = await Order.find({ status: "DELIVERY", username: qUser })
          .sort({ createdAt: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({
          status: "DELIVERY",
          username: qUser,
        }).count();
      }
      if (qStatus === "COMPLETED") {
        orders = await Order.find({ status: "COMPLETED", username: qUser })
          .sort({ createdAt: -1 })
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Order.find({
          status: "COMPLETED",
          username: qUser,
        }).count();
      }
    }
    let nextPage = parseInt(page) + 1;
    if (count !== 0) totalPages = Math.ceil(count / perPage);
    if (page === totalPages) {
      nextPage = null;
    }
    res.status(200).json({
      orders,
      currentPage: parseInt(page),
      totalPages: totalPages,
      nextPage,
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDER BY ID - CREATED BY USER
router.get("/detail/get/:id", async (req, res) => {
  try {
    const orderFound = await Order.findById(req.params.id);
    res.status(200).json(orderFound);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET ORDER BY USERNAME
router.get("/customer/get/:username", async (req, res) => {
  const qPage = req.query.page;
  let page = qPage || 1;
  let perPage = 5;
  let count = 0;
  try {
    const orderFound = await Order.find({
      username: req.params.username,
    })
      .skip(perPage * page - perPage)
      .limit(perPage);

    count = await Order.find({
      username: req.params.username,
    }).count();
    res.status(200).json({
      orderFound,
      currentPage: page,
      totalPages: Math.ceil(count / perPage),
      totalItems: count,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE STATUS -> CANCELLED
router.post("/cancel", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Order.findByIdAndRemove(req.body.id);
    res.status(200).json("Delete success");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ORDER LAST 7 DAY
router.get("/chart", async (req, res) => {
  try {
    let d = new Date();
    d.setDate(d.getDate() - 7);
    const chart = await Order.aggregate([
      // Only include the docs that have at least one passedModules element
      // that passes the filter.
      { $match: { createdAt: { $gt: d } } },
      // Duplicate the docs, one per passedModules element
      { $unwind: "$createdAt" },
      // Filter again to remove the non-matching elements
      { $match: { createdAt: { $gt: d } } },
      {
        $group: {
          _id: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: -1 } },
    ]);
    res.status(200).json(chart);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
