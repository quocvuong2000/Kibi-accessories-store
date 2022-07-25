const Product = require("../models/Product");
const Storage = require("../models/Storage");
async function monitorStorageImport(client, timeInMs) {
  const collection = client.db("kibi").collection("products");
  const pipeline = [
    {
      $match: {
        operationType: "insert",
        "fullDocument.quantity": { $gt: 0 },
      },
    },
  ];
  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    // console.log(next.documentKey._id);
    // const orderFound = await Order.findById(next.documentKey._id);
    // console.log("insert", next.documentKey._id);
    const newImport = {
      branchId: next.fullDocument.branches[0].branchId || "NA",
      productId: next.documentKey._id,
      newQuantity: next.fullDocument.quantity,
      oldQuantity: 0,
      branchName: next.fullDocument.branches[0].branchName || "NA",
      productName: next.fullDocument.product,
      status: "Import",
    };
    try {
      await new Storage(newImport).save();
      // console.log("insert", savedStorage);
    } catch (error) {
      console.log(error);
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageImport;
