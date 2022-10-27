const Admodel = require("../../models/Advert.model");
exports.updatead = async (req, res) => {
  try {
    id = req.params.id;
    const update = req.body;
    console.log("ad update body:\n", update);
    const ad = await Admodel.findById(id);

    if (ad) {
      // Object.assign(ad, update);
      ad.brand = update.brand;
      ad.name = update.name;
      ad.enginecc = update.enginecc;
      ad.price = update.price;
      ad.negotiable = update.negotiable;
      ad.created = update.created;
      ad.condition = update.condition;
      ad.county = update.county;
      ad.subcounty = update.subcounty;
      ad.counter = update.counter;
      ad.images = update.images;

      const result = await ad.save();
      res.send({ message: "ad updated successfully", updatedad: result });
    }
  } catch (error) {
    console.log("error: ", error.message);
    // console.log("full error: ", error);
    res.send({ err: error.message });
  }
};

exports.viewcounter = async (req, res) => {
  try {
    id = req.params.id;

    const ad = await Admodel.findById(id);

    if (ad) {
      ad.counter++;
      // console.log("update counter: ", ad);//new

      const updatecounter = await ad.save();
      // console.log("counter updated: ", updatecounter);

      res.status(202).send({
        message: "counter updated",
      });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ errmsg: error.message, fullerr: error });
  }
};
