const mongoose = require("mongoose");

const mpesa = (module.exports = mongoose.model(
  "MPESA-ACCNT-NO",
  new mongoose.Schema(
    {
      accountref: { type: String, required: true },
      phonenumber: { type: Number, default: 0 },
    },
    { timestamps: true }
  )
));
