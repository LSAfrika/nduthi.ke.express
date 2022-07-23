const mongoose = require("mongoose");

const Adschema = new mongoose.Schema({
  Brand: { type: String, required: true },
  name: { type: String, required: true },
  enginecc: { type: Number, required: true },
  price: { type: Number, required: true },
  username: { type: String, required: true },
  negotiable: { type: String, required: true },
  created: { type: Number, required: true, default: Date.now() },
  condition: { type: String, required: true },
  county: { type: String, required: true },
  subcounty: { type: String, required: true },
  ownerid: { type: mongoose.Schema.Types.ObjectId, required: true },
  counter: { type: number, required: true, default: 0 },
  Images: [{ type: String }],
});

module.exports = mongoose.model("Adsmodel", Adschema);
