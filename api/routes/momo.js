const router = require("express").Router();
const userService = require("../services/user.service");
const jsonFormat = require("../jsonHelper/jsonFormat");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
router.post("/get-momo-payment-link", async (req, res) => {
  try {
    try {
      const result = await userService.getMomoPaymentLink(req);
      return res
        .status(200)
        .json(jsonFormat.dataSuccess("Handle payment successfully", result));
    } catch (e) {
      return res
        .status(400)
        .json(
          jsonFormat.dataError(
            e.message
              ? e.message
              : "Somethings gone wrong, please try again or contact Admin if the issue persists."
          )
        );
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/signature", async (req, res) => {
  try {
    try {
      const result = await userService.getSignature(req);
      return res
        .status(200)
        .json(jsonFormat.dataSuccess("Handle payment successfully", result));
    } catch (e) {
      return res
        .status(400)
        .json(
          jsonFormat.dataError(
            e.message
              ? e.message
              : "Somethings gone wrong, please try again or contact Admin if the issue persists."
          )
        );
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/updateorder", async (req, res) => {
  try {
    try {
      const cartByUser = await Cart.findOne({ username: req.body.username });
      if (!cartByUser) return res.status(404).json("user cart not generate");
      const newOrder = new Order({
        username: cartByUser.username,
        email: req.body.email,
        products: cartByUser.products,
        totalProduct: req.body.totalProduct,
        totalPrice: req.body.totalPrice,
        amount: req.body.amount,
        address: req.body.address,
        recipientName: req.body.recipientName,
        recipientPhone: req.body.recipientPhone,
        shippingPrice: req.body.shippingPrice,
        leadTime: req.body.leadTime,
        status: "PENDING",
        paid: true,
      });
      await newOrder.save();
      res
        .status(200)
        .json(
          jsonFormat.dataSuccess("Handle payment successfully", { newOrder })
        );
    } catch (e) {
      console.log("errrrrrrorrrrrrrrrr", e);
      return res
        .status(400)
        .json(
          jsonFormat.dataError(
            e.message
              ? e.message
              : "Somethings gone wrong, please try again or contact Admin if the issue persists."
          )
        );
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
