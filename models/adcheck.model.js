const mongoose = require("mongoose");

const usersfirstad = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ADCHECKGUARD", usersfirstad);
