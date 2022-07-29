const fs = require("fs");
const mongoose = require("mongoose");

exports.dirmiddleware = async (req, res, next) => {
  try {
    const mongooseid = new mongoose.Types.ObjectId();
    // console.log("mongoose id: ", mongooseid);
    req.body._id = mongooseid;

    await fs.mkdir(`public/adimages/${mongooseid}`, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        path = `public/adimages/${mongooseid}`;
        req.body.imgpath = path;
        // console.log(req.body);
        next();
        //  res.status(201).json({ message: "new folder created", idcreated: Adid, adcreated: createdad });
      }
    });
  } catch (error) {
    res.send({ err: error.message });
  }
};
