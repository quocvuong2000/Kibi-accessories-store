const Branch = require("../models/Branch");
const {
  verifyTokenAndStaff,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndStaff, async (req, res) => {
  try {
    const count = await Branch.find().count();
    let newBranch;
    if (count === 0) {
      newBranch = new Branch({
        districtId: req.body.districtId,
        wardId: req.body.wardId,
        cityId: req.body.cityId,
        lat: req.body.lat,
        long: req.body.long,
        address: req.body.address,
        shopId: req.body.shopId,
        isDefault: true,
      });
    } else {
      newBranch = new Branch({
        districtId: req.body.districtId,
        wardId: req.body.wardId,
        cityId: req.body.cityId,
        lat: req.body.lat,
        long: req.body.long,
        address: req.body.address,
        shopId: req.body.shopId,
        isDefault: false,
      });
    }
    try {
      const savedBranch = await newBranch.save();
      res.status(200).json(savedBranch);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET
router.get("/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const qPage = req.query.page;
    let perPage = 8;
    let page = qPage || 1;
    let count = 0;
    try {
      let branches;
      if (qPage) {
        branches = await Branch.find()
          .skip(perPage * page - perPage)
          .limit(perPage);
      } else {
        branches = await Branch.find();
      }
      count = await Branch.count();
      res.status(200).json({
        branches, // sản phẩm trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndStaff, async (req, res) => {
  try {
    try {
      await Branch.findByIdAndDelete(req.params.id);
      res.status(200).json("Branch has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET BY ID
router.get("/get/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      const branches = await Branch.findById(req.params.id);
      res.status(200).json({
        branches, // sản phẩm trên một page
      });
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
