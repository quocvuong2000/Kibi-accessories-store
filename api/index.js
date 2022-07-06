const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
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
app.use("/api/wishlist", wishlistRoute);
app.use("/api/address", addressRoute);
app.use("/api/comment", commentRoute);
app.use("/api/viewed", viewedRoute);
app.use("/api/order", orderRoute);
app.use("/api/stripe", stripeRoute);
app.use("/api/momo", momoRoute);

//TRIGGER

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server backend is running");
});
