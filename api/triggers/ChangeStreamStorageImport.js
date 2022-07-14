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
      console.log("insert", next.documentKey._id);
    } else {
      console.log("update", next.documentKey._id);
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

module.exports = monitorStorageImport;
