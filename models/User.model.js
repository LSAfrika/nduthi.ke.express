const mongoose = require("mongoose");

const Userschema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    uid: { type: String, required: true },
    profileimg: { type: String, required: false },
    phone: { type: Number, required: true },
    ads: [{ type: mongoose.Schema.Types.ObjectId }],
    account: { type: String, required: true },
    createdat: { type: Number, require: true, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("usermodel", Userschema);
