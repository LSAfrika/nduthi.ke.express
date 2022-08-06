const mongoose = require("mongoose");

const Adschema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    name: { type: String, required: true },
    enginecc: { type: Number, required: true },
    price: { type: Number, required: true },
    negotiable: { type: String, required: true },
    created: { type: Number },
    condition: { type: String, required: true },
    county: { type: String, required: true },
    subcounty: { type: String, required: true },
    mpesaid: { type: String, required: true },
    adactivation: { type: Number, default: Date.now() },
    ownerid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USERS",
      required: true,
    },
    counter: { type: Number, required: true, default: 0 },
    Images: [{ type: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ADS", Adschema);
