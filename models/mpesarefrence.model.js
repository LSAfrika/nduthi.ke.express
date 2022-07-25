const mongoose = require("mongoose");

module.exports = mongoose.model(
  "safaricomrfefrencenumber",
  new mongoose.Schema({ accountref: { type: String, required: true } })
);
