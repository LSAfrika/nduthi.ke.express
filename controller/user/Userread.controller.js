const usermodel = require("../../models/User.model");

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
