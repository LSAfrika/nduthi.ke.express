const Admodel = require("../../models/Advert.model");
const fs = require("fs");

const { randomgenerator } = require("../../utilityfunctions/randomgen");
exports.createad = async (req, res) => {
  try {
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
      _id,
    } = req.body;

    let images = [];
    mpesaid = await randomgenerator();
    let start = 0;

    if (req.files) {
      let dirpath = req.body.imgpath;
      console.log('save path: \n',dirpath);
      const imgobject = req.files;
      const imgentries = Object.keys(imgobject);
      const imglength = imgentries.length;

      // console.log("keys: ", keys);
      imgentries.forEach(async (img) => {
        let filepath = dirpath + "/" + imgobject[img].name;
        let savepath= 'public/'+filepath
        let imglink = filepath.split('/')[1]+"/" + imgobject[img].name;
        let imagepath = "http://localhost:5050/" + imglink;
        let imagebinary = imgobject[img].data;
        // console.log(imgobject[img].data);

        fs.writeFileSync(savepath, imagebinary, (err) => {
          if (err) {
            console.log("error found while uploading ad photos: \n", err.message);
          }
        });

        images.push(imagepath);
        start++;
      });

      console.log("images: ", images);

      console.log("files uploaded: ", start);
    }

    console.log("images to upload: ", images);
    const adtocreate = await Admodel.create({
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
      Images: images,
      _id,
    });

    res.send({
      message: "ad creation route reached",

      ad: adtocreate,
    });

    console.log("files sync finished uploaded: ", start);
  } catch (error) {
    console.log("error:", error.message);
  }
};
