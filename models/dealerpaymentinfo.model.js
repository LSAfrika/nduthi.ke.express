const mongoose = require("mongoose");

module.exports = mongoose.model(
  "DEALERPAYMENTINFO",
  new mongoose.Schema({
    dealerid: { type: mongoose.Schema.Types.ObjectId, required: true },
    adactivation: { type: Number, required: true },
    paymentnumber: { type: Number, required: true },
    adcount: { type: Number, required: true, default: 0 },
    activeads: { type: Number, required: true, default: 0 },
  })
);
