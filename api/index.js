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
const wishlistRoute = require("./routes/wishlist");
const addressRoute = require("./routes/address");
const viewedRoute = require("./routes/viewed");
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
app.use("/api/wishlist", wishlistRoute);
app.use("/api/address", addressRoute);
app.use("/api/viewed", viewedRoute);

app.listen(5000, () => {
  console.log("Server backend is running");
});
