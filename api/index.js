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
const wishlistRoute = require("./routes/wishlist");
const addressRoute = require("./routes/address");
const commentRoute = require("./routes/comment");
const viewedRoute = require("./routes/viewed");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const momoRoute = require("./routes/momo");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL_CLOUD)
  .then(console.log("Connect to database success"))
  .catch((err) => console.log(err));
//   app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: mongoDbUrl
//     }),
//     cookie: {maxAge: 180 * 60 * 1000}
// }));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/product", productRoute);
app.use("/api/brand", brandRoute);
app.use("/api/category", categoryRoute);
app.use("/api/cart", cartRoute);
app.use("/api/user", userRoute);
app.use("/api/customer", customerRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/address", addressRoute);
app.use("/api/comment", commentRoute);
app.use("/api/viewed", viewedRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/momo", momoRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server backend is running");
});

const socketIo = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

socketIo.on("connection", (socket) => {
  ///Handle khi có connect từ client tới
  console.log("New client connected" + socket.id);

  socket.on("sendDataClient", function (data) {
    // Handle khi có sự kiện tên là sendDataClient từ phía client
    socketIo.emit("sendDataServer", { data }); // phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
  });
});

server.listen(9000, () => {
  console.log("Server đang chay tren cong 9000");
});
