const mongoose = require("mongoose");

module.exports = mongoose.model(
  "DEALERPAYMENTINFO",
  new mongoose.Schema({
    dealerid: { type: mongoose.Schema.Types.ObjectId, required: true },
    adactivation: { type: Number, required: true,default:Math.floor(Date.now()/1000 )},
    paymentnumber: { type: Number, required: true },
    account: { type: String, required: true, enum:['bronze','silver','gold'] },
    totalads:{type:Number,required:true,default:8,enum:[8,20,50]},
    activeads: { type: Number, required: true, default: 0 },
  })
);
