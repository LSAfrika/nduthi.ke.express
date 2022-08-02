const mpesamodel = require("../models/mpesarefrence.model");
const LNMORecipts = require("../models/LNMO.model");
const admodel = require("../models/Advert.model");

exports.callbackdata = async (data) => {
  console.log("log from stkcallbackhelper function \n stkdata: ", data);
  // try {

  const responsearray = data.CallbackMetadata.Item;
  const cellnumber = responsearray[responsearray.length - 1].Value;
  const mpesapaymentdoc = await mpesamodel.findOne({
    phonenumber: cellnumber,
  });

  if (mpesapaymentdoc) {
    console.log("mpesa doc: ", mpesapaymentdoc);
    mpesapaymentdoc.phonenumber = 0;
    await mpesapaymentdoc.save();

    console.log("mpesa doc after removing phone number: ", mpesapaymentdoc);

    return mpesapaymentdoc;
  } else {
    console.log("no document found");
    return null;
  }

  // } catch (error) {}
};
