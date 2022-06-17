const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  amount: { type: Number, required },
});

module.exports = mongoose.model("Payment", PaymentSchema);
