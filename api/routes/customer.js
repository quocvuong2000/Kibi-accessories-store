const router = require("express").Router();
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//GET LIST CUSTOMER - PAGINATION
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qPage = req.query.page;
  let perPage = 10; // số lượng sản phẩm xuất hiện trên 1 page
  let page = qPage || 1;
  let count = 0;
  try {
    let customers;
    if (qPage) {
      customers = await User.find({
        type: "customer",
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      customers = await User.find();
    }
    count = await User.find({
      type: "customer",
    }).count();
    res.status(200).json({
      customers, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE USER - CUSTOMER
router.put("/update/user/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const savedNew =  await User.findByIdAndUpdate(req.params.id, {$set : req.body}, {new : true});
    res.status(201).json(savedNew);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE PASSWORD - CUSTOMER
router.patch("/update/password/:id",verifyTokenAndAuthorization, async (req,res) => {
  const newPassword = req.body.password;
  try {
    const savedNew =  await User.findByIdAndUpdate(req.params.id, {$set : newPassword}, {new : true});
    res.status(201).json(savedNew);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
