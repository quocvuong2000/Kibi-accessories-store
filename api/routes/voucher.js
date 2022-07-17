const router = require("express").Router();
const Voucher = require("../models/Voucher");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

router.get("/:username", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const voucher = await Voucher.find({ username: req.params.username });
    try {
      res.status(200).json({ voucher });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    try {
      await Voucher.findByIdAndDelete(req.params.id);
      res.status(200).json("Voucher has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
