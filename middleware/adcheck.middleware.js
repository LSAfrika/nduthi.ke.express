const mongoose = require("mongoose");
const firstadcheck = require("../models/adcheck.model");
const dayjs = require("dayjs");

exports.adcheckguard = async (req, res, next) => {
  try {
    // const userid = req.body.ownerid;

    // console.log("req body for ad creation adckeck guard:\n", req.body);
    const parseuserid = JSON.parse(req.body.data);
    const userid = parseuserid.ownerid;

    const chekingforuser = await firstadcheck.findOne({ user: userid });

    if (chekingforuser) {
      console.log("user has already created first ad");
      req.body.adactivation = Date.now();
      // console.log("req body ad creation ad check guard: \n", req.body);

      next();
    } else {
      console.log("user id to create ad:\n", userid);
      const firstadguard = await firstadcheck.create({ user: userid });
      console.log("first ad created:\n", firstadguard);
      const nextmonth = dayjs().add(1, "month");

      nextmonthstring = dayjs(nextmonth.toDate());
      const expirytimestamp = Math.round(new Date(nextmonthstring).getTime());
      req.body.adactivation = expirytimestamp;

      req.body.firstad = true;

      // await firstadcheck.create({ user: userid });
      console.log("users first ad");

      // console.log("req body ad creation ad check guard: \n", req.body);

      next();
    }
  } catch (error) {
    console.log("error from first ad check middleware: \n", error.message);
    res.send({ message: "error while creating ad", error });
  }
};
