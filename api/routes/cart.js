const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//ADD TO CART
router.post("/add", async (req, res) => {
  const productAdded = await Product.findById(req.body.productId);
  const cartByUser = await Cart.find({ username: req.body.username }[0]);
  let cartUpdate;
  let cartList = cartByUser[0].products;
  if (cartList.length === 0) {
    cartUpdate = await Cart.findByIdAndUpdate(cartByUser[0].id, {
      products: [
        {
          productId: productAdded.id,
          productName: productAdded.product,
          productPrice: productAdded.price,
          quantity: 1,
        },
      ],
    });
  } else {
    let newUpdate;
    const productFound = cartList.find(
      (el) => el.productId === req.body.productId
    );
    // console.log(productFound);
    let cartTemp = [];
    if (productFound !== undefined) {
      newUpdate = {
        productId: productFound.productId,
        productName: productFound.productName,
        productPrice: productFound.productPrice,
        quantity: productFound.quantity + 1,
      };
      cartList.forEach((el) => {
        if (el.productId === req.body.productId) {
          cartTemp.push(newUpdate);
        } else {
          cartTemp.push(el);
        }
      });
    } else {
      newUpdate = {
        productId: productAdded.id,
        productName: productAdded.product,
        productPrice: productAdded.price,
        quantity: 1,
      };
      cartTemp = cartList;
      cartTemp.push(newUpdate);
    }

    cartUpdate = await Cart.findByIdAndUpdate(cartByUser[0].id, {
      products: cartTemp,
    });
  }

  try {
    // const addCart = await pInfo.save();
    res.status(200).json("update success");
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

// const express = require('express');
// const router = express.Router();

// const Cart = require('../models/cart');
// const Product = require('../models/product');

// router.get('/add-to-cart', function (req, res) {
//     const productId = req.params.id;
//     const cart = new Cart(req.session.cart ? req.session.cart : {});

//     Product.findById(productId, function (err, product) {
//         if(err) {
//             return res.redirect('/');
//         }
//         cart.add(product, product.id);
//         req.session.cart = cart;
//         console.log(req.session.cart);
//         res.redirect('/');
//     })
// });

// router.get('/cart/reduce/:id', function (req, res, next) {
//     const productId = req.params.id;
//     const cart = new Cart(req.session.cart ? req.session.cart : {});
//     cart.reduceByOne(productId);
//     req.session.cart = cart;
//     res.redirect('/cart');
// });

// router.get('/cart/remove/:id', function (req, res, next) {
//     const productId = req.params.id;
//     const cart = new Cart(req.session.cart ? req.session.cart : {});
//     cart.removeItem(productId);
//     req.session.cart = cart;
//     res.redirect('/cart');
// });

// router.get('/cart', function (req, res, next) {
//     if(!req.session.cart) {
//         return res.render('/cart', {products: null});
//     }
//     const cart = new Cart(req.session.cart);
//     return res.render('shop/cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
// });

// module.exports = router;
