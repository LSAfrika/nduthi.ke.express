const Admodel = require("../../models/Advert.model");

exports.getad = async (req, res) => {
  try {
    id = req.params.id;
    const ad = await Admodel.findById(id).populate(
      "ownerid",
      "username phone createdAt"
    );

    if (ad) {
      res.send({ ...ad._doc });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};

exports.getallads = async (req, res) => {
  try {
    const ads = await Admodel.find().populate(
      "ownerid",
      "username phone createdAt"
    );
    //{
    //  adactivation: { $gt: Date.now() },
    //  }

    let returnedads = [];
    if (ads) {
      ads.forEach((ad) => {
        const {
          _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        } = ad;
        const resad = {
          id: _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        };

        returnedads.push(resad);
      });
      //  console.log(returnedads);
      res.send({ returnedads });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ err: error.message });
  }
};

exports.getalluserads = async (req, res) => {
  try {
    const id = req.params.id;
    const ads = await Admodel.find({ ownerid: id }).populate(
      "ownerid",
      "username phone createdAt"
    );
    //{
    //  adactivation: { $gt: Date.now() },
    //  }

    let returnedads = [];
    if (ads) {
      ads.forEach((ad) => {
        const {
          _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        } = ad;
        const resad = {
          id: _id,
          brand,
          name,
          enginecc,
          price,
          negotiable,
          condition,
          county,
          subcounty,
          mpesaid,
          ownerid,
          counter,
          Images,
          createdAt,
        };

        returnedads.push(resad);
      });
      // console.log(returnedads);
      res.send({ returnedads });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ errmsg: error.message, fullerr: error });
  }
};

exports.similarads = async (req, res) => {
  try {
    const count = await Admodel.count();
    console.log("totaldocs: \n", count);
    const minimumcount = count - 3;
    const skip = Math.floor(Math.random() * minimumcount);
    console.log("random gen: ", skip);

    const ad = await Admodel.find()
      .limit(3)
      .skip(skip * 1)
      .populate("ownerid", "username phone createdAt");

    if (ad) {
      res.send({ ad });
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};
