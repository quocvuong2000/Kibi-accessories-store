const { findByIdAndUpdate } = require("../models/Address");
const Address = require("../models/Address");
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

//CREATE NEW ADDRESS
router.post("/create", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const addressByUser = await Address.findOne({
      username: req.body.username,
    });
    if (!addressByUser) {
      const newAddress = {
        username: req.body.username,
        addressList: [
          {
            address: req.body.address,
            isDefault: true,
            recipientName: req.body.receiverName,
            recipientPhone: req.body.recipientPhone,
            ward: req.body.ward,
            district: req.body.district,
            city: req.body.city,
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
      let newAddress = {};
      let addressList = addressByUser.addressList;

      if (addressList.length === 0) {
        newAddress = {
          address: req.body.address,
          isDefault: true,
          recipientName: req.body.receiverName,
          recipientPhone: req.body.recipientPhone,
          ward: req.body.ward,
          district: req.body.district,
          city: req.body.city,
        };
      } else {
        newAddress = {
          address: req.body.address,
          isDefault: false,
          recipientName: req.body.receiverName,
          recipientPhone: req.body.recipientPhone,
          ward: req.body.ward,
          district: req.body.district,
          city: req.body.city,
        };
      }
      addressList.push(newAddress);

      try {
        const savedAddress = await Address.findByIdAndUpdate(addressByUser.id, {
          addressList: addressList,
        });
        res.status(200).json(savedAddress);
      } catch (err) {
        // console.log(err);
        res.status(500).json(err);
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//DELETE ADDRESS
router.put("/delete/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const addressFound = await Address.findById(req.body.addressId);

    if (!addressFound) {
      res.status(404).json("address item not found");
    } else {
      try {
        const newAddress = addressFound.addressList.filter(
          (el) => el.id !== req.body.addressItemId
        );
        // console.log(newAddress);
        // const savedAddress = await Address.findByIdAndRemove({
        //   addressList: [{ _id: req.params.id }],
        // });
        // console.log(savedAddress);
        const savedAddress = await Address.findByIdAndUpdate(
          addressFound.id,
          {
            addressList: newAddress,
          },
          { new: true }
        );
        res.status(200).json(savedAddress);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//UPDATE ADDRESS
router.put("/update/", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const addressFound = await Address.findById(req.body.addressId);
    if (!addressFound) {
      res.status(404).json("address item not found");
    } else {
      try {
        const newaddress = await Address.findOne({
          username: addressFound.username,
        }).then((address) => {
          // console.log(address);
          let newAddressItem = address.addressList.id(req.body.addressItemId);
          // console.log(newAddressItem);
          newAddressItem.address = req.body.address;
          newAddressItem.ward = req.body.ward;
          newAddressItem.district = req.body.district;
          newAddressItem.city = req.body.city;
          // console.log(newAddressItem);
          return address.save();
        });
        res.status(200).json(newaddress);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET ADDRESS LIST BY USERNAME
router.get("/get/:username", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const addressByUser = await Address.find({ username: req.params.username });
    if (!addressByUser) {
      res.status(404).json("Not found address");
    } else {
      try {
        res.status(200).json(addressByUser);
      } catch (err) {
        console.log("err:", err);
        res.status(500).json(err);
      }
    }
  } catch (error) {
    res.status(504).json(error);
  }
});

//GET ADDRESS LIST BY USERNAME AND ID
router.get(
  "/get/:username/detail/:id",
  verifyTokenAndAuthorization,
  async (req, res) => {
    try {
      const addressByUser = await Address.findOne({
        username: req.params.username,
      });
      if (!addressByUser) {
        res.status(404).json("Not found address");
      } else {
        const address = addressByUser.addressList.find(
          (el) => el.id === req.params.id
        );
        // console.log(address);
        try {
          res.status(200).json(address);
        } catch (err) {
          res.status(500).json(err);
        }
      }
    } catch (error) {
      res.status(504).json(error);
    }
  }
);
module.exports = router;
