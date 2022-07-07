const router = require("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");