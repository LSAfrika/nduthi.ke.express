const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    fbuid: { type: String, required: true },
    profileimg: { type: String, required: false },
    phone: { type: Number, required: true },
    account: { type: String, required: true, enum: ["company", "individual"] },
    createdat: { type: Number, require: true, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usermodel", Userschema);
