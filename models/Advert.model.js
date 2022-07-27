const mongoose = require("mongoose");

const Adschema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    enginecc: { type: Number, required: true },
    price: { type: Number, required: true },
    negotiable: { type: String, required: true },
    created: { type: Number, required: true, default: Date.now() },
    condition: { type: String, required: true },
    county: { type: String, required: true },
    subcounty: { type: String, required: true },
    mpesaid: { type: String, required: true },
    ownerid: { type: mongoose.Schema.Types.ObjectId, required: true },
    counter: { type: Number, required: true, default: 0 },
    Images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adsmodel", Adschema);
