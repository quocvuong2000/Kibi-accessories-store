const Voucher = require("../models/Voucher");
const Order = require("../models/Order");
async function monitorOrders(client, timeInMs) {
  const collection = client.db("kibi").collection("orders");
  const pipeline = [
    {
      $match: {
        operationType: "update",
      },
    },
  ];

  const changeStream = collection.watch(pipeline);

  changeStream.on("change", async (next) => {
    if (next.updateDescription.updatedFields.status === "COMPLETED") {
      const orderFound = await Order.findById(next.documentKey._id);
      if (orderFound.totalPrice >= 5000000) {
        const inUseDay = 5;
        const currentDay = new Date();
        const expireDay = new Date();
        expireDay.setDate(currentDay.getDate() + inUseDay);
        const newVoucher = {
          voucherName: "Giảm 50K",
          username: orderFound.username,
          salePrice: 50000,
          duration: 5,
          expireDay: expireDay,
          totalPrice: 200000,
        };
        try {
          const savedVoucer = new Voucher(newVoucher);
          await savedVoucer.save();
          console.log(
            `Voucher cho khach hang ${next.fullDocument.username} da duoc tao`
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  });

  // await closeChangeStream(timeInMs, changeStream);
}

//close the change stream after the given amount of time
function closeChangeStream(timeInMs = 6000, changeStream) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Closing the change stream");
      changeStream.close();
      resolve();
    }, timeInMs);
  });
}

module.exports = monitorOrders;
