const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const brandRoute = require("./routes/brand");
const categoryRoute = require("./routes/category");
const cartRoute = require("./routes/cart");
const userRoute = require("./routes/user");
const customerRoute = require("./routes/customer");
const staffRoute = require("./routes/staff");
const wishlistRoute = require("./routes/wishlist");
const addressRoute = require("./routes/address");
const commentRoute = require("./routes/comment");
const viewedRoute = require("./routes/viewed");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const momoRoute = require("./routes/momo");
const voucherRoute = require("./routes/voucher");

const monitorOrders = require("./triggers/ChangeStreamOrder");
const monitorProduct = require("./triggers/ChangeStreamProduct");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL_CLOUD)
  .then(async () => {
    const client = mongoose.connection.client;
    await monitorOrders(client, 15000);
    await monitorProduct(client);
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/staff", staffRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/address", addressRoute);
app.use("/api/comment", commentRoute);
app.use("/api/viewed", viewedRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/momo", momoRoute);
app.use("/api/voucher", voucherRoute);

//TRIGGER

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server backend is running");
});

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
var roomno = 1;
socketIo.on("connection", (socket) => {
  socket.emit("output-message", "old message");
  socket.on("old-message", function (data) {
    console.log(data);
  });
  socket.join("room");
  socket
    .in("room-" + roomno)
    .emit("connectToRoom", "You are in room no. " + roomno);
  socket.on("connect", function (socket) {
    socket.emit("B", somethingElse);
  });

  socket.on("sendDataClient", function (data) {
    socketIo.emit("sendDataServer", { data });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(9000, () => {
  console.log("Server đang chay tren cong 9000");
});
