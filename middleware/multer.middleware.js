const multer = require("multer");
const mongoose = require("mongoose");

exports.fileuploader = async (req, res, next) => {
  try {
    const mongooseid = new mongoose.Types.ObjectId();
    console.log("mongoose id: ", mongooseid);
    req.body._id = mongooseid;

    next();
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};
