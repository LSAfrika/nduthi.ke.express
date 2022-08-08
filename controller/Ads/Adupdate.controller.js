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

exports.viewcounter = async (req, res) => {
  try {
    id = req.params.id;

    const ad = await Admodel.findById(id);

    if (ad) {
      ad.counter++;
      // console.log("update counter: ", ad);//

      const updatecounter = await ad.save();
      console.log("counter updated: ", updatecounter);

      res.status(202).send({
        message: "counter updated",
      });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ errmsg: error.message, fullerr: error });
  }
};
