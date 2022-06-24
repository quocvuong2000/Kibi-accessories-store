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
      address: req.body.address,
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
      // console.log(err);
      res.status(500).json(err);
    }
  }
});

//DELETE ADDRESS
router.put("/delete/", verifyTokenAndAuthorization, async (req, res) => {
  const addressFound = await Address.findById(req.body.addressId);
  // console.log(addressFound);
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
});

//UPDATE ADDRESS
router.put("/update/", verifyTokenAndAuthorization, async (req, res) => {
  const addressFound = await Address.findById(req.body.addressId);
  if (!addressFound) {
    res.status(404).json("address item not found");
  } else {
    // let addressItemFound = addressFound.addressList.find(
    //   (el) => el.id === req.body.addressItemId
    // );
    // const newAddressItem = {

    // }
    // // addressItemFound = { ...addressItemFound, street: req.body.address };
    // console.log(addressItemFound);

    // const newList = [];
    // addressFound.addressList.forEach((el) => {
    //   if (el.id === req.body.addressItemId) {
    //     newList.push(addressItemFound);
    //   } else {
    //     newList.push(el);
    //   }
    // });
    try {
      const newaddress = await Address.findOne({
        username: addressFound.username,
      }).then((address) => {
        // console.log(address);
        let newAddressItem = address.addressList.id(req.body.addressItemId);
        // console.log(newAddressItem);

        newAddressItem.street = req.body.address;
        // console.log(newAddressItem);
        return address.save();
      });
      res.status(200).json(newaddress);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

//GET ADDRESS LIST BY USERNAME
router.get("/get", verifyTokenAndAuthorization, async (req, res) => {
  const addressByUser = await Address.find({ username: req.body.username });
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
