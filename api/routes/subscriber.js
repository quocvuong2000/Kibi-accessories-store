const router = require("express").Router();
const Subscriber = require("../models/Subscriber");
const nodemailer = require("nodemailer");
const templateEmail = require("../utils/templateEmail");
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

router.get("/", async (req, res) => {
  try {
    try {
      const qPage = req.query.page;
      let perPage = 10;
      let page = qPage || 1;

      let count = 0;
      let subscribe;
      if (req.query.status) {
        subscribe = await Subscriber.find({ status: req.query.status })
          .skip(perPage * page - perPage)
          .limit(perPage);

        count = await Subscriber.find({ status: req.query.status }).count();
      } else {
        subscribe = await Subscriber.find()
          .skip(perPage * page - perPage)
          .limit(perPage);
        count = await Subscriber.find().count();
      }

      return res.status(200).json({
        subscribe, // sản phẩm trên một page
        currentPage: page, // page hiện tại
        totalPages: Math.ceil(count / perPage), // tổng số các page: ;
        totalItems: count,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.get("/del/:email", async (req, res) => {
  try {
    try {
      await Subscriber.findOneAndDelete({ email: req.params.email });
      res.status(200).json(error);
      res.redirect("https://gmail.com");
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

router.post("/sendemail", async (req, res) => {
  try {
    try {
      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "kibiaccessories@gmail.com",
          pass: "grtijvdvmqmiujvq",
        },
      });
      const emailList = await Subscriber.find();
      emailList.forEach((element) => {
        var mainOptions = {
          from: "KibiAccessories",
          to: element.email,
          subject: "News",
          html: templateEmail.templateEmail(req.body.content, element.email),
        };
        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            console.log(err);
            return res.status(400).json(err);
          } else {
            console.log("Message sent: " + info.response);
          }
        });
      });
      return res.status(200).json("Send successful");
    } catch (error) {
      console.log("error", error);
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

module.exports = router;
