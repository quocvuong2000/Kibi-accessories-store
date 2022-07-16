const router = require("express").Router();
const Voucher = require("../models/Voucher");
const { verifyToken } = require("./verifyToken");

router.get("/:username", verifyToken, async (req, res) => {
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

router.delete("/:id", verifyToken, async (req, res) => {
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
