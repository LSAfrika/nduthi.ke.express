const mongoose = require("mongoose");

module.exports = mongoose.model(
  "LNMO",
  new mongoose.Schema({
    Amount: { type: Number, required: true },
    MpesaReceiptNumber: { type: String, required: true },
    Balance: { type: Number, required: true, default: 0 },
    TransactionDate: { type: Number, required: true },
    PhoneNumber: { type: Number, required: true },
  })
);
