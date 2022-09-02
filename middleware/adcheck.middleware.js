const mongoose = require("mongoose");
const firstadcheck = require("../models/adcheck.model");
const dayjs = require("dayjs");

exports.adcheckguard = async (req, res, next) => {
  try {
    const userid = req.body.ownerid;

    const chekingforuser = await firstadcheck.findOne({ user: userid });

    if (chekingforuser) {
      console.log("user has already created first ad");
      req.body.adactivation = Date.now();
      // console.log("req body ad creation ad check guard: \n", req.body);

      next();
    } else {
      const nextmonth = dayjs().add(1, "month");

      nextmonthstring = dayjs(nextmonth.toDate());
      const expirytimestamp = Math.round(new Date(nextmonthstring).getTime());
      req.body.adactivation = expirytimestamp;
      await firstadcheck.create({ user: userid });
      console.log("users first ad");

      // console.log("req body ad creation ad check guard: \n", req.body);

      next();
    }
  } catch (error) {
    console.log("error from first ad check middleware: \n", error.message);
    res.send({ message: "error while creating ad", error });
  }
};
