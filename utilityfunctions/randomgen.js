const accountrefmodel = require("../models/mpesarefrence.model");

exports.randomgenerator = async () => {
  const fixed = 6;
  let randomstring = "";
  const charachters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

  console.log("random characterset length:", charachters.length);
  for (let i = 0; i < fixed; i++) {
    randomstring += charachters.charAt(
      Math.floor(Math.random() * charachters.length)
    );
  }
  console.log("random string: ", randomstring);
  const refnumber = await accountrefmodel.findOne({ accountref: randomstring });

  if (refnumber) {
    randomgenerator();
    return;
  }
  const ref = new accountrefmodel({
    accountref: randomstring,
  });

  const result = await ref.save();
  // console.log("saved ref: ", result);

  return randomstring;
};
