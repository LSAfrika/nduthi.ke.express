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
    console.log("Auth middleware error authorization: ", error.message);

    if (error.message === "jwt expired") {
      const refreshtoken = req.cookies.access;
      const user = jwt.verify(refreshtoken, process.env.REFRESHKEY);
      console.log("user from refresh token: ", user);

      delete user.iat;

      const authtoken = jwt.sign(user, process.env.HASHKEY, {
        expiresIn: "10m",
      });
      req.body.ownerid = user._id;

      // next()

      return res.send({ auth: true, authtoken });
    }

    res.send({
      message: "error occured during authorization",
      errmsg: error.message,
      errfull: error,
    });
  }
};
exports.dealerpaymentauthorization = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    //  console.log("token received: ", reqtoken);

    const token = reqtoken.split(" ")[1];
    const decodedtoken = jwt.decode(token);
    // console.log("decoded token: \n", decodedtoken);
    // const verified = jwt.verify(token, process.env.HASHKEY);
    // console.log("verfied token: ", verified);
    req.body.ownerid = decodedtoken._id;
    req.body.accounttype = decodedtoken.account;

    next();
  } catch (error) {
    console.log(
      "Auth middleware error dealerpaymentauthorization: ",
      error.message
    );

    if (error.message === "jwt expired") {
      const refreshtoken = req.cookies.access;
      console.log(
        "refresh token from dealerapyment jwt expiry: \n",
        refreshtoken
      );
      const user = jwt.verify(refreshtoken, process.env.REFRESHKEY);
      console.log("user from refresh token: ", user);

      const authtoken = jwt.sign(user, process.env.HASHKEY);
      req.body.ownerid = user._id;
      req.body.accounttype = user.account;

      req.body.authtoken = authtoken;

      next();
    }

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

    // console.log("token received: ", req.cookies);

    const token = reqtoken.split(" ")[1];
    const decodedtoken = jwt.decode(token);
    // console.log("decoded token: \n", decodedtoken);
    const verified = await jwt.verify(token, process.env.HASHKEY);
    // console.log("auth guard token verified & not expired: ", verified);
    return res.send({ auth: true });

    // next();
  } catch (error) {
    // console.log("Auth middleware error: auth guard", error.message);
    if (error.message === "jwt expired") {
      console.log("token expired needs to be refreshed");
      try {
        const refreshtoken = req.cookies.access;
        // console.log("jwt expired refresh token cookie:", refreshtoken);

        const refresheduser = jwt.verify(refreshtoken, process.env.REFRESHKEY);
        // console.log("user from refresh token: ", refresheduser);

        delete refresheduser.iat;
        // const usertokendata = Object.entries(refresheduser).filter(
        //   ([key, value]) => key != "iat"
        // );
        console.log("token without iat:\n", refresheduser);

        const authtoken = await jwt.sign(refresheduser, process.env.HASHKEY, {
          expiresIn: "10m",
        });
        const senttoken = await jwt.decode(authtoken);
        console.log("new generated token after token expiry:\n", senttoken);
        return res.send({ auth: true, authtoken });
      } catch (error) {
        console.log(" refresh token error message: ", error.message);
        res.clearCookie("access");
        res.send({
          auth: false,
        });
      }
    }

    // console.log("Auth middleware full error: ", error);
    res.clearCookie("access");

    res.send({
      auth: false,
    });
  }
};

exports.firebasetokenlogin = async (req, res, next) => {
  try {
    const reqtoken = req.headers.authorization;

    const token = reqtoken.split(" ")[1];
    // console.log("firebase token: ", token);
    const verified = jwt.decode(token);
    // console.log("firebase token check: ", verified);
    if (
      !verified.iss &&
      verified.iss !== "https://securetoken.google.com/nduthi-co-ke"
    )
      return res.status(401).send({ message: "verification failed" });

    const comparefirebaseuid = verified.sub;

    const getuser = await user.findOne({ fbuid: comparefirebaseuid });

    if (getuser) {
      console.log("loging in user: ", getuser);

      const token = await jwt.sign({ ...getuser._doc }, process.env.HASHKEY, {
        expiresIn: "10m",
      });
      console.log("login user stroage token:\n", token);

      const Refreshtokenset = refreshtoken({ ...getuser._doc });
      //  console.log("login cookie refresh token:\n", Refreshtoken);
      req.body.authtoken = token;
      req.body.accesstoken = Refreshtokenset;
      next();
    } else {
      res.send({ message: `no user`, id: comparefirebaseuid });
    }
  } catch (error) {
    console.log("login Auth middleware error: ", error.message);
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
    console.log("sign up Auth middleware error: ", error.message);
    res.send({ message: `no user`, errormsg: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("access");
    console.log("cookies from log out route: ", req.cookies);
    res.send({ message: "log out successful" });
  } catch (error) {
    console.log("log out failed: ", error.message);
    res.status(500).send({ message: "error while loging out" });
  }
};

function refreshtoken(user) {
  return jwt.sign(user, process.env.REFRESHKEY);
}
