const Product = require("../models/Product");
const Order = require("../models/Order");
const Storage = require("../models/Storage");
var mongoose = require("mongoose");
async function monitorStorageExport(client, timeInMs) {
  const collection = client.db("kibi").collection("orders");
  const pipeline = [
    {
      $match: {
        $or: [
          {
            operationType: "update",
            "updateDescription.updatedFields.status": "COMPLETED",
          },
          {
            operationType: "insert",
            "updateDescription.updatedFields.status": "PENDING",
          },
          {
            operationType: "update",
            "updateDescription.updatedFields.status": "CANCELLED",
          },
        ],
      },
    },
  ];
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    if (next.updateDescription.updatedFields.status === "PENDING") {
      const orderFound = await Order.findById(next.documentKey._id);
      orderFound.products.forEach(async (el) => {
        const productDetail = await Product.findById(el.productId);
        const branchFound = productDetail.branches.find(
          (el) => el.branchId.toString() === orderFound.branchId
        );

        const newBranchesArr = [];
        productDetail.branches.forEach((proEl) => {
          if (proEl.branchId.toString() === orderFound.branchId) {
            newBranchesArr.push({
              branchId: branchFound.branchId,
              branchName: branchFound.branchName,
              quantity: branchFound.quantity - parseInt(el.quantity),
              oldQuantity: branchFound.quantity,
            });
          } else {
            newBranchesArr.push(proEl);
          }
        });
        try {
          await Product.findByIdAndUpdate(el.productId, {
            branches : newBranchesArr,
            oldQuantity : productDetail.quantity,
            quantity : productDetail.quantity - el.quantity
          });
        } catch (error) {
          console.log(error);
        }
      });
    }

    if (next.updateDescription.updatedFields.status === "CANCELLED") {
    }
    if (next.updateDescription.updatedFields.status === "COMPLETE") {
      const orderFound = await Order.findById(next.documentKey._id);
      orderFound.products.forEach(async (el) => {
        if (mongoose.Types.ObjectId.isValid(el.productId)) {
          const oldQuantity = await Product.findById(el.productId);

          if (oldQuantity && oldQuantity.quantity > 0) {
            const newQuantity = oldQuantity.quantity - el.quantity;
            const newExport = {
              branchId: orderFound.branchId || "NA",
              productId: el.productId,
              newQuantity: newQuantity,
              oldQuantity: oldQuantity.quantity,
              branchName: orderFound.branchName || "NA",
              productName: el.productName,
              status: "Export",
            };
            try {
              const savedStorage = new Storage(newExport);
              await savedStorage.save();
              await Product.findByIdAndUpdate(el.productId, {
                quantity: newQuantity,
              });
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageExport;
