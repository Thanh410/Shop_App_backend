"use strict";

var express = require("express");
var app = express();
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var userRoute = require("./routes/user");
var authRoute = require("./routes/auth");
var productRoute = require("./routes/product");
var cartRoute = require("./routes/cart");
var orderRoute = require("./routes/order");
var stripeRoute = require("./routes/stripe");
var cors = require("cors");
var db = require("./config/db");
dotenv.config();
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

// Connect db
db.Connect();
app.listen(process.env.PORT || 5000, function () {
  console.log("Backend server is running! " + process.env.PORT);
});