const Product = require("../models/Product");
const Order = require("../models/Order");
const Storage = require("../models/Storage");
var mongoose = require("mongoose");
async function monitorStorageExport(client, timeInMs) {
  const collection = client.db("kibi").collection("orders");
  const pipeline = [];
  const changeStream = collection.watch(pipeline);
  changeStream.on("change", async (next) => {
    // console.log(next);
    if (next.operationType === "insert") {
      console.log("insert,pending");
      //FIND ORDER
      const orderFound = await Order.findById(next.documentKey._id);

      //FIND ALL PRODUCT IN ORDER
      orderFound.products.forEach(async (el) => {
        const productDetail = await Product.findById(el.productId);

        //FIND BRANCH IN PRODUCT MATCH WITH ORDER BRANCH
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
            branches: newBranchesArr,
            oldQuantity: productDetail.quantity,
            quantity: productDetail.quantity - el.quantity,
          });
        } catch (error) {
          console.log(error);
        }
      });
    }

    if (next.operationType === "update") {
      if (next.updateDescription.updatedFields.status === "CANCELLED") {
        console.log("update, cancelled");
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
                quantity: branchFound.quantity + parseInt(el.quantity),
                oldQuantity: branchFound.quantity,
              });
            } else {
              newBranchesArr.push(proEl);
            }
          });
          try {
            await Product.findByIdAndUpdate(el.productId, {
              branches: newBranchesArr,
              oldQuantity: productDetail.quantity,
              quantity: productDetail.quantity + el.quantity,
            });
          } catch (error) {
            console.log(error);
          }
        });
      }
      if (next.updateDescription.updatedFields.status === "COMPLETED") {
        console.log("update, complete");

        const orderFound = await Order.findById(next.documentKey._id);
        orderFound.products.forEach(async (el) => {
          const productDetail = await Product.findById(el.productId);
          const branchFound = productDetail.branches.find(
            (el) => el.branchId.toString() === orderFound.branchId
          );
          console.log(branchFound);
          const newImport = {
            branchId: branchFound?.branchId || "NA",
            productId: productDetail._id,
            newQuantity: branchFound?.quantity,
            oldQuantity: branchFound?.oldQuantity,
            branchName: branchFound?.branchName || "NA",
            productName: productDetail.product,
            status: "Export",
          };
          try {
            await Storage(newImport).save();
          } catch (error) {
            console.log(error);
          }
        });
      }
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageExport;
