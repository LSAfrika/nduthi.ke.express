const Admodel = require("../../models/Advert.model");
exports.updatead = async (req, res) => {
  try {
    id = req.params.id;
    const update = req.body;
    const ad = await Admodel.findById(id);

    if (ad) {
      Object.assign(ad, update);
      result = await ad.save();
      res.send({ message: "ad updated successfully", res: ad });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};
