const Brand = require("../models/Brand");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndStaff,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndStaff, async (req, res) => {
  const newBrand = new Brand(req.body);

  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
