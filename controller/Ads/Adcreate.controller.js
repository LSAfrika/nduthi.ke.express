const Admodel = require("../../models/Advert.model");
const { randomgenerator } = require("../../utilityfunctions/randomgen");
exports.createad = async (req, res) => {
  try {
    console.log("body: ", req.body);
    let {
      brand,
      name,
      enginecc,
      price,
      negotiable,
      createad,
      condition,
      county,
      subcounty,
      ownerid,
      counter,
      mpesaid,
      images,
      _id,
    } = req.body;

    // const mpesaaccnt =
    mpesaid = await randomgenerator();

    const adtocreate = new Admodel({
      brand,
      name,
      enginecc,
      price,
      negotiable,
      createad,
      condition,
      county,
      subcounty,
      ownerid,
      counter,
      mpesaid,
      images,
      _id,
    });

    result = await adtocreate.save();

    res.send({
      message: "ad creation route reached",
      //   code: mpesaaccnt,
      ad: result,
    });
  } catch (error) {
    console.log("error:", error.message);
  }
};
