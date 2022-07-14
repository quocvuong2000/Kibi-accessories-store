const Product = require("../models/Product");
const Storage = require("../models/Storage");
async function monitorStorageImport(client, timeInMs) {
  const collection = client.db("kibi").collection("products");
  const pipeline = [
    {
      $match: {
        $or: [
          { operationType: "insert", "fullDocument.quantity": { $gt: 0 } },
          {
            operationType: "update",
            "updateDescription.updatedFields.quantity": { $gt: 0 },
          },
        ],
      },
    },
  ];
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    // console.log(next.documentKey._id);
    // const orderFound = await Order.findById(next.documentKey._id);
    if (next.operationType === "insert") {
      // console.log("insert", next.documentKey._id);
      const newExport = {
        branchId: next.fullDocument.branchId || "NA",
        productId: next.documentKey._id,
        newQuantity: next.fullDocument.quantity,
        oldQuantity: 0,
        branchName: next.fullDocument.branchName || "NA",
        ProductName: next.fullDocument.productName,
        status: "Import",
      };
      try {
        const savedStorage = new Storage(newExport);
        await savedStorage.save();
      } catch (error) {
        console.log(error);
      }
    } else {
      // console.log("update", next);
      const oldQuantity = await Product.findById(next.documentKey._id);

      if (oldQuantity && oldQuantity.quantity > 0) {
        const newQuantity = next.updateDescription.updatedFields.quantity;
        const newExport = {
          branchId: oldQuantity.branchId || "NA",
          productId: next.documentKey._id,
          newQuantity: newQuantity,
          oldQuantity: 0,
          branchName: oldQuantity.branchName || "NA",
          productName: oldQuantity.product,
          status: "Import",
        };
        try {
          const savedStorage = new Storage(newExport);
          await savedStorage.save();
        } catch (error) {
          console.log(error);
        }
      }
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageImport;
