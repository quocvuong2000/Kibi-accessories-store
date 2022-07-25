const router = require("express").Router();
const Subscriber = require("../models/Subscriber");

router.post("/add", async (req, res) => {
  try {
    try {
      const subFound = await Subscriber.findOne({ email: req.body.email });
      const subscriber = new Subscriber({ email: req.body.email });
      if (!subFound) {
        await subscriber.save();
        return res.status(200).json({ subscriber });
      } else {
        return res.status(201).json("Email subscribed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.delete("/del/:email", async (req, res) => {
  try {
    try {
      await Subscriber.findOneAndDelete({ email: req.params.email });
      res.status(200).json(error);
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
