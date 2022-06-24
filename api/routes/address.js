const Address = require("../models/Address");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE NEW ADDRESS
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  const addressByUser = await Address.findOne({ username: req.body.username });
  if (!addressByUser) {
    const newAddress = {
      username: req.body.username,
      addressList: [
        {
          address: req.body.address,
          isDefault: req.body.isDefault,
          recipientName: req.body.receiverName,
          recipientPhone: req.body.recipientPhone,
        },
      ],
    };
    const createAddress = new Address(newAddress);
    try {
      const saveAddress = await createAddress.save();
      res.status(200).json(saveAddress);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    let addressList = addressByUser.addressList;
    const newAddress = {
      street: req.body.street,
      ward: req.body.ward,
      district: req.body.district,
      city: req.body.city,
      isDefault: req.body.isDefault,
      recipientName: req.body.receiverName,
      recipientPhone: req.body.recipientPhone,
    };
    addressList.push(newAddress);
    try {
      const savedAddress = await Address.findByIdAndUpdate(addressByUser.id, {
        addressList: addressList,
      });
      res.status(200).json(savedAddress);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//DELETE ADDRESS
router.delete("/delete/:id", async (req, res) => {
  const addressFound = await Address.findOne({
    addressList: [{ _id: req.params.id }],
  });
  console.log("addressFound:", addressFound);
  if (!addressFound) {
    res.status(404).json("address item not found");
  } else {
    try {
      await Address.findOneAndDelete({
        addressList: [{ _id: req.params.id }],
      });
      res.status(200).json("delete success");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//UPDATE ADDRESS
router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
  const addressFound = await Address.findOne({
    addressList: [{ _id: req.params.id }],
  });
  if (!addressFound) {
    res.status(404).json("address item not found");
  } else {
    const newAddress = {
      address: req.body.address,
      isDefault: req.body.isDefault,
      recipientName: req.body.receiverName,
      recipientPhone: req.body.recipientPhone,
    };
    try {
      await Address.findByIdAndUpdate(
        {
          addressList: [{ _id: req.params.id }],
        },
        newAddress,
        { new: true }
      );
      res.status(200).json("delete success");
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

//GET ADDRESS LIST BY USERNAME
router.get("/get/:username", async (req, res) => {
  const addressByUser = await Address.find({ username: req.params.username });
  if (!addressByUser) {
    res.status(404).json("Not found address");
  } else {
    try {
      res.status(200).json(addressByUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }
});
module.exports = router;
