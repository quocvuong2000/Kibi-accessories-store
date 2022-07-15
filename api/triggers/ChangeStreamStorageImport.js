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
      const newImport = {
        branchId: next.fullDocument.branchId || "NA",
        productId: next.documentKey._id,
        newQuantity: next.fullDocument.quantity,
        oldQuantity: 0,
        branchName: next.fullDocument.branchName || "NA",
        productName: next.fullDocument.product,
        status: "Import",
      };

      try {
        const savedStorage = new Storage(newImport);
        await savedStorage.save();
        // console.log("insert", savedStorage);
      } catch (error) {
        console.log(error);
      }
    }
    if (next.operationType === "update") {
      // console.log("update", next);
      const oldQuantity1 = await Product.findById(next.documentKey._id);
      if (oldQuantity1 && oldQuantity1.quantity > 0) {
        const newQuantity1 = next.updateDescription.updatedFields.quantity;

        const status =
          newQuantity1 > oldQuantity1.oldQuantity ? "Import" : "Export";
        const newImport1 = {
          branchId: oldQuantity1.branchId || "NA",
          productId: next.documentKey._id,
          newQuantity: newQuantity1,
          oldQuantity: oldQuantity1.oldQuantity,
          branchName: oldQuantity1.branchName || "NA",
          productName: oldQuantity1.product,
          status: status,
        };
        //newQuantity1 > oldQuantity1.quantity ? "Import" :
        console.log(newImport1);
        try {
          const savedStorage = await Storage(newImport1).save();
          // console.log("update", savedStorage);
          // await savedStorage.save();
        } catch (error) {
          console.log(error);
        }
      }
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageImport;
