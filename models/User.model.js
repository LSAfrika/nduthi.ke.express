const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  uid: { type: String, required: true },
  profileimg: { type: String, required: false },
  phone: { type: Number },
});

module.exports = mongoose.model("usermodel", Userschema);
