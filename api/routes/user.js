const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

router.get("/:token", async (req, res) => {
  try {
    const user = await User.find({ accessToken: req.params.token });
    try {
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/:token", async (req, res) => {
  try {
    const user = await User.find({ accessToken: req.params.token });
    try {
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/edit/phone", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {
      phone: req.body.phone,
    });

    try {
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/edit/email", verifyTokenAndAuthorization, async (req, res) => {
  try {
    console.log("req.body.email:", req.body.email);
    const user = await User.findByIdAndUpdate(req.body.userId, {
      email: req.body.email,
      username: req.body.email,
    });

    try {
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/edit/password", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.body.userId, {
      password: req.body.password,
    });
    try {
      res.status(200).json({ user });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
