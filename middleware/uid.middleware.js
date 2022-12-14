const fs = require("fs");
const mongoose = require("mongoose");

exports.dirmiddleware = async (req, res, next) => {
  try {
    const mongooseid = new mongoose.Types.ObjectId();
    // console.log("mongoose id: ", mongooseid);
    req.body._id = mongooseid;

    if(fs.existsSync(`public/adimages/${mongooseid}`)){
      console.log('folder exists');
      path = `adimages/${mongooseid}`;
      req.body.imgpath = path;
      return next()
    }

    await fs.mkdir(`public/adimages/${mongooseid}`, (err) => {
      if (err) {
        console.log(err.message);
      } else {
      path = `adimages/${mongooseid}`;
      // path = `/${mongooseid}`;
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

exports.userphotomiddleware = async (req,res,next)=>{
  try {

    const {ownerid}=req.body

    if(fs.existsSync(`public/userphoto/${ownerid}`)){
      console.log('folder exists');
      path = `/${ownerid}`;
      req.body.imgpath = path;
      return next()
    }

    await fs.mkdir(`public/userphoto/${ownerid}`, (err) => {
      if (err) {
        console.log('dir creation error userphot: ',err.message);
      } else {
        path = `/${ownerid}`;
        req.body.imgpath = path;
        // console.log(req.body);
        next();
        //  res.status(201).json({ message: "new folder created", idcreated: Adid, adcreated: createdad });
      }
    });
    
  } catch (error) {
    
  }
}
