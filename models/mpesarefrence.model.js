const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Accountnumbermodel",
  new mongoose.Schema({
    accountref: { type: String, required: true },
    phonenumber: { type: Number, default: 0 },
  })
);
