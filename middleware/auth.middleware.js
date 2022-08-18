const mongoose = require("mongoose");
const user = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.authorization = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    // console.log("token received: ", reqtoken);

    const token = reqtoken.split(" ")[1];

    const verified = jwt.verify(token, process.env.HASHKEY);
    // console.log('verfied token: ',verified);
    req.body.ownerid = verified.getuser._id;

    // console.log('ad to be saved: ',req.body);
    next();
  } catch (error) {
    console.log("Auth middleware error: ", error.message);
    res.send({
      message: "error occured during authorization",
      errmsg: error.message,
      errfull: error,
    });
  }
};

exports.firebasetokenlogin = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    const token = reqtoken.split(" ")[1];

    const verified = jwt.decode(token);
    console.log("firebase token check: ", verified);
    const comparefirebaseuid = verified.sub;

    const getuser = await user.findOne({ fbuid: comparefirebaseuid });

    if (getuser) {
      console.log("loging in user: ", getuser);

      const token = jwt.sign({ getuser }, process.env.HASHKEY);
      req.body.authtoken = token;
      next();
    } else {
      res.send({ message: `no user`, id: comparefirebaseuid });
    }
  } catch (error) {
    console.log("Auth middleware error: ", error.message);
    res.send({ message: `no user`, errormsg: error.message });
  }
};

exports.firebasetokensignup = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    const token = reqtoken.split(" ")[1];

    const verified = jwt.decode(token);
    //    console.log('firebase token check: ',verified);
    const firebaseuid = verified.sub;

    const getuser = await user.findOne({ fbuid: firebaseuid });

    if (getuser) {
      return res.send({ message: "user already exsist please login" });
    } else {
      req.body.fbuid = firebaseuid;
      req.body.email = verified.email;
      next();
    }
  } catch (error) {
    console.log("Auth middleware error: ", error.message);
    res.send({ message: `no user`, errormsg: error.message });
  }
};
