const Admodel = require("../../models/Advert.model");
exports.getad = async (req, res) => {
  try {
    id = req.params.id;
    const ad = await Admodel.findById(id);

    if (ad) {
      res.send({ ad });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};

exports.getallads = async (req, res) => {
  try {
    id = req.params.id;
    const ads = await Admodel.find();

    if (ads) {
      res.send({ ads });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};
