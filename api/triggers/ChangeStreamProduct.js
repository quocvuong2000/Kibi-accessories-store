async function monitorProduct(client, timeInMin) {
  const collection = client.db("kibi").collection("products");
  const changeStream = collection.watch();

  changeStream.on("change", async (next) => {});
}

module.exports = monitorProduct;
