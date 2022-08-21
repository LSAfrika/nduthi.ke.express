const usermodel = require("../../models/User.model");
const jwt = require("jsonwebtoken");
const fs = require('fs')
require("dotenv").config();

exports.createuser = async (req, res) => {
  try {
    const { username, email, phone, fbuid, account } = req.body;

    console.log(" user to create values: ", username, email, phone, fbuid);
    const firebaseuid = await usermodel.findOne({ fbuid: fbuid });
    const getemail = await usermodel.findOne({ email: email });

    if (firebaseuid || getemail) {
      console.log("user is in the data base");
      return res.status(409).send({ message: "user already exists" });
    }
    const newuser = new usermodel({
      username,
      account,
      phone,
      fbuid,
      email,
    });
    const createduser = await newuser.save();
    console.log("created user: ", createduser);

    const usertoken = await jwt.sign(
      { ...createduser._doc },
      process.env.HASHKEY
    );

    res.send({ message: "Account created successfully", token: usertoken });
  } catch (error) {
    console.log("create user error: ", error.message);
    res.send({
      message: "erro at create user",
      err: error.message,
      fullerr: error,
    });
  }
};

exports.uploadphoto= async (req,res)=>{

  try {

    const {ownerid,imgpath}=req.body

    const user= await usermodel.findById(ownerid)
console.log('user photo route req.body: \n', ownerid,imgpath);
    if(!user) return res.status(404).send({message:'no user found in the data base'})

    if (req.files){
      //  console.log('photo for upload: \n',req.files.profile);
      // const name = req.files.profile.name
      const extension=req.files.profile.mimetype.split('/')[1]

      if(extension==='jpg'||extension==='png'||extension==='jpeg'){
      const filename =`profilephoto.${extension}`
      console.log('file name to save: \n',filename);
      console.log('file name user photo: \n',filename);
      const imagedata =req.files.profile.data
      let imagepath = "http://localhost:5050"+"/userphoto" + imgpath+"/"+filename;

      const savepath =`public/userphoto${imgpath}/`+filename
      console.log('save path: \n',savepath);


      fs.writeFileSync(savepath, imagedata, (err) => {
        if (err) {
          console.log("error found while uploading user photo: \n", err.message);
        }

      })

      user.pictureurl=imagepath
      await user.save()
     return res.send({message:'profile phot uploaded',user})
    }

    return res.status(301).send({message:'please upload a png/jpeg/jpg file'})


    }

    res.send({message:'no image found to upload'})



      // console.log('user found in data base: ', user);
    
    
  } catch (error) {
    

    console.log('error from user photo upload \n',error.message);

    res.send({message:'error while uploading profile image',errmsg:error.message,fullerr:error})
  }
}
