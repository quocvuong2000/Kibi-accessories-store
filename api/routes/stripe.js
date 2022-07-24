const router = require("express").Router();
const Stripe = require("stripe");
const Cart = require("../models/Cart");
const Order = require("../models/Order");
const stripe = Stripe(
  "sk_test_51K0LBnFjydqiWgwtg4a0r0hnsEBhu8jEBKTrDyThWzU6PCPgPsCNoiubM74PZ5iHq11TufH2B6GgVR59JkR4QJWm00jQ9Ujabx"
);

router.post("/payment", async (req, res) => {
  try {
    const cartByUser = await Cart.findOne({ username: req.body.username });
    if (!cartByUser) return res.status(404).json("user cart not generate");
    // console.log(cartByUser.products);
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
    stripe.charges.create(
      {
        source: req.body.tokenId,
        amount: req.body.totalPrice,
        currency: "vnd",
      },
      async (stripeErr, stripeRes) => {
        if (stripeErr) {
          console.log(stripeErr);
          res.status(500).json(stripeErr);
        } else {
          await newOrder.save();
          res.status(200).json({ stripeRes, newOrder });
        }
      }
    );
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
