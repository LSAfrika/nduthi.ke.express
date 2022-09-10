const usermodel = require("../../models/User.model");
const jwt = require("jsonwebtoken");

exports.getuser = async (req, res) => {
  try {
    const userid = req.params.id;

    const Getuser = await usermodel.findById({ _id: userid });

    res.send({ Getuser });

    //   res.send({ message: "usercreated", user: createduser });
  } catch (error) {
    console.log("get user error: ", error.message);
    res.send({
      message: "error at get user",
      err: error.message,
    });
  }
};

exports.getusers = async (req, res) => {
  try {
    const Getusers = await usermodel.find();

    if (Getusers) {
      res.send({ Getusers });
    }

    //   res.send({ message: "usercreated", user: createduser });
  } catch (error) {
    console.log("get user error: ", error.message);
    res.send({
      message: "error at get user",
      err: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { authtoken, accesstoken } = req.body;
    // console.log("access token to set cookie:\n", accesstoken);

    res.cookie("access", accesstoken, {
      httpOnly: true,
    });
    //* , { httpOnly: true }

    // console.log("token to be received by user\n", authtoken);
    console.log("cookies sent to user after log in\n",req);
    res.send({ authtoken });
  } catch (error) {
    console.log("get user error: ", error.message);
    res.send({
      message: "error at get user",
      err: error.message,
    });
  }
};

// exports.guard = async (req, res) => {
//   try {
//     console.log("guard endpoint request body", req.cookies);
//   } catch (error) {}
// };
