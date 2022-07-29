const multer = require("multer");
const mongoose = require("mongoose");

exports.fileuploader = async (req, res, next) => {
  try {
    const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, `./${req.body.imgpath}`);
      },

      filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
      },
    });

    console.log("storage const: ", storage.getDestination);

    const fileFilter = (req, file, cb) => {
      // reject a file
      if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
      } else {
        cb(null, false);
      }
    };

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: fileFilter,
    });

    upload.single("productImage");

    console.log("body: ", req.body);

    //next();
  } catch (error) {
    console.log("error: ", error.message);
    res.send({ err: error.message });
  }
};
