const Admodel = require("../../models/Advert.model");
const fs = require("fs");

exports.updatead = async (req, res) => {
  try {
    id = req.params.id;
    const update = req.body;
    // console.log("ad update body:\n", update);
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
      ad.images = [];
      // console.log("images array after delete:\n", ad.images);
      ad.images = update.images.flat();
      // console.log("images array after populating:\n", ad.images);

      const result = await ad.save();
      res.send({ message: "ad updated successfully", updatedad: result });
    }
  } catch (error) {
    console.log("error: ", error.message);
    // console.log("full error: ", error);
    res.send({ err: error.message });
  }
};

exports.imagesupdate = async (req, res) => {
  const id = req.params.id;

  const ad = await Admodel.findById(id);
  // const ad = await Admodel.findById(id).exists();
  if (ad === null) return res.status(400).send({ message: "no ad found" });
  let deletionarray = [];
  if (Object.keys(req.body).length !== 0) {
    let counter = 0;
    console.log("full image path for deletion:\n", req.body.del);

    if (Array.isArray(req.body.del) === true) {
      const imagespathfordeletionarray = req.body.del;
      const imagesfordeletionarraylength = req.body.del.length;
      console.log("created array for images", imagespathfordeletionarray);
      let arrayForImagesToCompareForDeletion = [];
      imagespathfordeletionarray.forEach((path) => {
        arrayForImagesToCompareForDeletion.push(path);
        const segmentedpath = path.split("adimages")[1];
        const filepath = "public/adimages" + segmentedpath;
        deletionarray.push(filepath);

        counter++;

        if (counter >= imagesfordeletionarraylength) {
          const imagesInAd = ad.images;
          console.log("images links in ad before deletion: ", ad.images);

          deletionarray.forEach((del) => {
            try {
              fs.unlinkSync(del);
            } catch (error) {
              console.log("error when deletingimages: \n", error.message);
              throw new Error(error.message);

              // return res.send({
              //   message: "error while deleting images",
              //   imageerror: error.message,
              // });
            }
          });

          const newImagesArrayToSave = imagesInAd.filter((imageslink) => {
            return !arrayForImagesToCompareForDeletion.find((deletionlink) => {
              return imageslink === deletionlink;
            });
          });

          ad.images = [];
          ad.images = newImagesArrayToSave;

          console.log("images links in ad after deletion: ", ad.images);
        }
      });
      // return
    } else {
      const fullpath = req.body.del;
      const segmentedpath = fullpath.split("adimages")[1];
      const filepath = "public/adimages" + segmentedpath;

      try {
        fs.unlinkSync(filepath);
        let pathindex = ad.images.indexOf(fullpath);
        console.log("single image array before splicing: ", ad.images);
        ad.images.splice(pathindex, 1);
        console.log("single new image array after splicing: ", ad.images);
      } catch (error) {
        return res.send({
          message: "error while deleting images",
          imageerror: error.message,
        });
      }
    }

    await ad.save();

    // console.log("ad after images deletion\n", ad);
    console.log("images links in ad after deletion: ", ad.images);
  }

  // return

  // return res.send({message:'testing images working',array:deletionarray,deletedimages:ad})

  // const ad = await Admodel.findById('62ee610e9e3146f88ac294b1');

  const dirpath = `adimages/${id}`;
  let imagecounter = 0;

  if (req.files) {
    //  console.log("files in body:\n", req.files);

    const imgobject = req.files;
    const imgentries = Object.keys(imgobject);
    const imageslength = imgentries.length;
    imgentries.forEach(async (img) => {
      let imagename = Date.now() + imgobject[img].name;
      let filepath = dirpath + "/" + imagename;
      let savepath = "public/" + filepath;
      // let imglink = filepath.split('/')[1]+"/" + imgobject[img].name;
      let imagepath = "http://localhost:5050/" + filepath;
      let imagebinary = imgobject[img].data;
      console.log("path for each file\n", imagepath);

      fs.writeFileSync(savepath, imagebinary, (err) => {
        if (err) {
          console.log(
            "error found while uploading ad photos: \n",
            err.message,
            err
          );
        }
      });

      ad.images.push(imagepath);
      imagecounter++;
    });

    console.log("images: ", ad.images);

    if (imagecounter >= imageslength) await ad.save();

    return res
      .status(202)
      .send({ message: "ad images updated", updatedad: ad });
  }

  return res.status(202).send({ message: "ad update complete", updatedad: ad });

  // const updatead = Admodel.findById(id);
  // const savepath = ``;
  // if (updatead) {
  // }
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
