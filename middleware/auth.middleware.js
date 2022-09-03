const mongoose = require("mongoose");
const user = require("../models/User.model");
const jwt = require("jsonwebtoken");

exports.authorization = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    // console.log("token received: ", reqtoken);

    const token = reqtoken.split(" ")[1];
    const decodedtoken = jwt.decode(token);
    // console.log("decoded token: \n", decodedtoken);
    const verified = jwt.verify(token, process.env.HASHKEY);
    // console.log("verfied token: ", verified);
    req.body.ownerid = verified._id;

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

exports.authorizationGuard = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    // console.log("token received: ", reqtoken);

    const token = reqtoken.split(" ")[1];
    // const decodedtoken = jwt.decode(token);
    // console.log("decoded token: \n", decodedtoken);
    const verified = jwt.verify(token, process.env.HASHKEY);
    console.log("auth guard token verification: ", verified);
    res.send({ auth: true });

    // next();
  } catch (error) {
    console.log("Auth middleware error: ", error.message);
    // console.log("Auth middleware full error: ", error);
    res.send({
      auth: false,
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

      const token = jwt.sign({ ...getuser._doc }, process.env.HASHKEY);
      console.log("login genreate token:\n", token);
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
    console.log("firebase token check: ", verified);
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
