const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

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
    let staffs;
    if (qPage) {
      staffs = await User.find({
        type: "staff",
      })
        .skip(perPage * page - perPage)
        .limit(perPage);
    } else {
      staffs = await User.find();
    }
    count = await User.find({
      type: "staff",
    }).count();
    res.status(200).json({
      staffs, // sản phẩm trên một page
      currentPage: page, // page hiện tại
      totalPages: Math.ceil(count / perPage), // tổng số các page: ;
      totalItems: count,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE STAFF
router.post("/register", verifyTokenAndAdmin,async (req, res) => {
  const userInfo = new User({
    username: req.body.email,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.VUONG_SEC_PASS
    ).toString(),
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    dob: req.body.dob,
    gender: req.body.gender,
    type: req.body.type,
    role : req.body.role,
    avatar : req.body.avatar,
  });
  const userFound = await User.findOne({ email: req.body.email });
  if (userFound !== null && userFound !== undefined) {
    try {
      return res.status(201).json("Email already exist");
    } catch (error) {
      return res.status(501).json(error);
    }
  }

  try {
    const register = await userInfo.save();
    res.status(200).json(register);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE STAFF
router.delete("/delete/:id",verifyTokenAndAdmin,async (req,res)=> {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Delete success");
  } catch (error) {
    res.status(500).json(error);
  }
})

//UPDATE STAFF
router.put("/update/:id",verifyTokenAndAdmin,async(req,res)=> {
  try {
    const updateStaff = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateStaff);
  } catch (err) {
    res.status(500).json(err);
  }
})

//GET DETAIL STAFF
router.get("/detail/:id",verifyTokenAndAdmin,async(req,res)=> {
  try {
    const staffFound = await User.findById(req.params.id);
    res.status(200).json(staffFound);
  } catch (error) {
    res.status(500).json(error);
  }
})
module.exports = router;
