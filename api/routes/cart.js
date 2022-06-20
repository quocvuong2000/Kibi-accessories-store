const router = require("express").Router();
const { verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

//ADD TO CART
router.post("/add", verifyTokenAndAuthorization, async (req, res) => {
  const productAdded = await Product.findById(req.body.productId);
  if (!productAdded) return res.status(404).json("product not found");

  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");

  let cartList = cartByUser.products;
  let defaultTotalPrice = cartList.reduce(
    (total, cur) => (total += cur.productPrice * cur.quantity),
    0
  );
  // cartList.forEach((el) => {
  //   return (defaultTotalPrice += el.productPrice * el.quantity);
  // });

  if (cartList.length === 0) {
    try {
      // const addCart = await pInfo.save();
      await Cart.findByIdAndUpdate(cartByUser.id, {
        products: [
          {
            productId: productAdded.id,
            productName: productAdded.product,
            productPrice: productAdded.price,
            productImage: productAdded.images[0],
            quantity: 1,
          },
        ],
        totalPrice: defaultTotalPrice + productAdded.price,
      });
      res.status(200).json("update success");
    } catch (error) {
      res.status(501).json(error);
    }
  } else {
    //FIND IF PRODUCT ALREADY EXISTS
    const productFound = cartList.find(
      (el) => el.productId === req.body.productId
    );
    let cartTemp = [];
    let newUpdate;
    if (productFound !== undefined) {
      newUpdate = {
        productId: productFound.productId,
        productName: productFound.productName,
        productPrice: productFound.productPrice,
        productImage: productFound.productImage[0],
        quantity: productFound.quantity + 1,
      };
      defaultTotalPrice -= productFound.quantity * productFound.productPrice;
      defaultTotalPrice +=
        (productFound.quantity + 1) * productFound.productPrice;
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
        //Image in product
        productImage: productAdded.images[0],
        quantity: 1,
      };
      defaultTotalPrice += productAdded.price;
      cartTemp = cartList;
      cartTemp.push(newUpdate);
    }
    try {
      // const addCart = await pInfo.save();
      await Cart.findByIdAndUpdate(cartByUser.id, {
        products: cartTemp,
        totalPrice: defaultTotalPrice,
      });
      res.status(200).json("update success");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});

//DECREASE
router.post("/item/decrease", verifyTokenAndAuthorization, async (req, res) => {
  //FIND CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  let cartList = cartByUser.products;
  let defaultTotalPrice = cartList.reduce(
    (total, cur) => (total += cur.productPrice * cur.quantity),
    0
  );
  //FIND IF PRODUCT IN CART
  const productFound = cartList.find(
    (el) => el.productId === req.body.productId
  );
  if (!productFound) return res.status(404).json("product not found");
  let cartTemp = [];
  if (productFound.quantity - 1 <= 0) {
    cartTemp = cartList.filter((el) => el.productId !== req.body.productId);
  } else {
    let newUpdate = {
      productId: productFound.productId,
      productName: productFound.productName,
      productPrice: productFound.productPrice,
      productImage: productFound.productImage[0],

      quantity: productFound.quantity - 1 === 0 ? 0 : productFound.quantity - 1,
    };
    defaultTotalPrice -= productFound.quantity * productFound.productPrice;
    defaultTotalPrice +=
      (productFound.quantity - 1 === 0 ? 0 : productFound.quantity - 1) *
      productFound.productPrice;
    cartList.forEach((el) => {
      if (el.productId === req.body.productId) {
        cartTemp.push(newUpdate);
      } else {
        cartTemp.push(el);
      }
    });
  }
  try {
    await Cart.findByIdAndUpdate(cartByUser.id, {
      products: cartTemp,
      totalPrice: defaultTotalPrice,
    });
    // const addCart = await pInfo.save();
    res.status(200).json("decrease success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//INCREASE
router.post("/item/increase", verifyTokenAndAuthorization, async (req, res) => {
  try {
    //FIND CART
    const cartByUser = await Cart.findOne({ username: req.body.username });

    if (!cartByUser) return res.status(404).json("user cart not generate");
    let cartList = cartByUser.products;
    let defaultTotalPrice = cartList.reduce(
      (total, cur) => (total += cur.productPrice * cur.quantity),
      0
    );
    //FIND IF PRODUCT IN CART
    const productFound = cartList.find(
      (el) => el.productId === req.body.productId
    );
    if (!productFound) return res.status(404).json("product not found");
    let cartTemp = [];

    let newUpdate = {
      productId: productFound.productId,
      productName: productFound.productName,
      productPrice: productFound.productPrice,
      productImage: productFound.productImage[0],
      quantity: productFound.quantity + 1,
    };
    defaultTotalPrice -= productFound.quantity * productFound.productPrice;
    defaultTotalPrice +=
      (productFound.quantity + 1) * productFound.productPrice;
    cartList.forEach((el) => {
      if (el.productId === req.body.productId) {
        cartTemp.push(newUpdate);
      } else {
        cartTemp.push(el);
      }
    });
    await Cart.findByIdAndUpdate(cartByUser.id, {
      products: cartTemp,
    });
    // const addCart = await pInfo.save();
    res.status(200).json("increase success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
//DELETE
router.post("/delete", verifyTokenAndAuthorization, async (req, res) => {
  //FIND CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  let cartList = cartByUser.products;
  let defaultTotalPrice = cartList.reduce(
    (total, cur) => (total += cur.productPrice * cur.quantity),
    0
  );
  //FIND IF PRODUCT IN CART
  const productFound = cartList.find(
    (el) => el.productId === req.body.productId
  );
  if (!productFound) return res.status(404).json("product not found");
  defaultTotalPrice -= productFound.quantity * productFound.productPrice;
  let cartTemp = cartList.filter((el) => el.productId !== req.body.productId);

  try {
    await Cart.findByIdAndUpdate(cartByUser.id, {
      products: cartTemp,
      totalPrice: defaultTotalPrice,
    });
    // const addCart = await pInfo.save();
    res.status(200).json("delete success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//OVERRIDING CURRENT CART
// {productId,username,quantity }
router.post("/overriding", verifyTokenAndAuthorization, async (req, res) => {
  const productAdded = await Product.findById(req.body.productId);
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");

  let cartList = cartByUser.products;
  let defaultTotalPrice = cartList.reduce(
    (total, cur) => (total += cur.productPrice * cur.quantity),
    0
  );
  if (cartList.length === 0) {
    try {
      // const addCart = await pInfo.save();
      defaultTotalPrice -= productAdded.quantity * productAdded.price;
      defaultTotalPrice += req.body.quantity * productAdded.price;
      await Cart.findByIdAndUpdate(cartByUser.id, {
        products: [
          {
            productId: productAdded.id,
            productName: productAdded.product,
            productPrice: productAdded.price,
            productImage: productAdded.images[0],
            quantity: req.body.quantity,
          },
        ],
      });
      res.status(200).json("update success");
    } catch (error) {
      console.log(error);
      res.status(501).json(error);
    }
  } else {
    //FIND IF PRODUCT ALREADY EXISTS
    const productFound = cartList.find(
      (el) => el.productId === req.body.productId
    );
    let cartTemp = [];
    let newUpdate;
    if (productFound !== undefined) {
      newUpdate = {
        productId: productFound.productId,
        productName: productFound.productName,
        productPrice: productFound.productPrice,
        productImage: productFound.productImage[0],
        quantity: req.body.quantity,
      };
      defaultTotalPrice -= productFound.quantity * productFound.price;
      defaultTotalPrice += req.body.quantity * productFound.price;
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
        //Image in product
        productImage: productAdded.images[0],
        quantity: req.body.quantity,
      };
      defaultTotalPrice -= productFound.quantity * productFound.price;
      defaultTotalPrice += req.body.quantity * productFound.price;
      cartTemp = cartList;
      cartTemp.push(newUpdate);
    }
    try {
      // const addCart = await pInfo.save();
      await Cart.findByIdAndUpdate(cartByUser.id, {
        products: cartTemp,
      });
      res.status(200).json("update success");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
});

//GET CART BY USERNAME
router.get("/:username", verifyTokenAndAuthorization, async (req, res) => {
  const rs = await Cart.findOne({ username: req.params.username });
  !rs && res.status(401).json("Wrong credentials!");
  try {
    res.status(200).json(rs);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET CART
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  const rs = await Cart.find(req.body.username);
  !rs && res.status(401).json("Wrong credentials!");
  try {
    res.status(200).json(rs);
  } catch (error) {
    console.log(error);
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
