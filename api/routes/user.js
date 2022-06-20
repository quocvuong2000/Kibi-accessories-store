const router = require("express").Router();
const User = require("../models/User");

router.get("/:token", async (req, res) => {
  const user = await User.find({ accessToken: req.params.token });
  try {
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:token", async (req, res) => {
  const user = await User.find({ accessToken: req.params.token });
  try {
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
