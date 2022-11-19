const mongoose = require("mongoose");

module.exports = mongoose.model(
  "TICKET",
  new mongoose.Schema(
    {
      email: { type: String, required: true },
      subject: { type: String, required: true },
      ticket: { type: String, required: true },
      checked: { type: Boolean, required: true, default: false },
    },
    { timestamps: true }
  )
);
