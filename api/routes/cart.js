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
  let quantityAdded = req.body.quantity || 1;
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
            quantity: quantityAdded,
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
    let quantityFound = 1;
    let cartTemp = [];
    let newUpdate;
    if (productFound !== undefined) {
      quantityFound = productFound.quantity;
      newUpdate = {
        productId: productFound.productId,
        productName: productFound.productName,
        productPrice: productFound.productPrice,
        productImage: productFound.productImage[0],
        quantity: quantityFound + 1,
      };
      defaultTotalPrice -= quantityFound * productFound.productPrice;
      defaultTotalPrice += (quantityFound + 1) * productFound.productPrice;
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
        quantity: quantityAdded,
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
      res.status(200).json({ totalPrice: defaultTotalPrice });
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

  let newUpdate = {
    productId: productFound.productId,
    productName: productFound.productName,
    productPrice: productFound.productPrice,
    productImage: productFound.productImage[0],

    quantity: productFound.quantity - 1 === 0 ? 1 : productFound.quantity - 1,
  };
  defaultTotalPrice -= productFound.quantity * productFound.productPrice;
  defaultTotalPrice +=
    (productFound.quantity - 1 === 0 ? 1 : productFound.quantity - 1) *
    productFound.productPrice;
  cartList.forEach((el) => {
    if (el.productId === req.body.productId) {
      cartTemp.push(newUpdate);
    } else {
      cartTemp.push(el);
    }
  });
  try {
    await Cart.findByIdAndUpdate(cartByUser.id, {
      products: cartTemp,
      totalPrice: defaultTotalPrice,
    });
    // const addCart = await pInfo.save();
    res.status(200).json({ totalPrice: defaultTotalPrice });
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
      totalPrice: defaultTotalPrice,
    });
    // const addCart = await pInfo.save();
    res.status(200).json({ totalPrice: defaultTotalPrice });
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
    res.status(200).json({ totalPrice: defaultTotalPrice });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//DELETE ALL CART
router.post("/delete/all", verifyTokenAndAuthorization, async (req, res) => {
  //FIND CART
  const cartByUser = await Cart.findOne({ username: req.body.username });
  if (!cartByUser) return res.status(404).json("user cart not generate");
  try {
    await Cart.findByIdAndUpdate(cartByUser.id, {
      products: [],
      totalPrice: 0,
    });
    // const addCart = await pInfo.save();
    res.status(200).json("Delete all success");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//GET CART BY USERNAME
router.get("/:username", async (req, res) => {
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
