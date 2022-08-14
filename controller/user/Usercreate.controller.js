const usermodel = require("../../models/User.model");
const jwt = require('jsonwebtoken')
require('dotenv').config()

exports.createuser = async (req, res) => {
  try {
    const { username, email, phone, fbuid } = req.body;

  

    console.log(" user to create values: ", username, email, phone, fbuid);
    const firebaseuid = await usermodel.findOne({ fbuid: fbuid });
    const getemail = await usermodel.findOne({ email: email });

    if (firebaseuid || getemail) {
      console.log("user is in the data base");
      return res.status(409).send({ message: "user already exists" });
    }
    const newuser = new usermodel({
      username,
      email,
      phone,
      fbuid,
    });
    const createduser = await newuser.save();
    console.log('created user: ',createduser);


    const usertoken = await jwt.sign({...createduser._doc},process.env.HASHKEY)

    if(req.files){
      console.log('profile image: ',req.files.profile);
    }

    res.send({ message: "usercreated", token:usertoken });
  } catch (error) {
    console.log("create user error: ", error.message);
    res.send({
      message: "erro at create user",
      err: error.message,
      fullerr:error
    });
  }
};
