const usermodel = require("../../models/User.model");
const jwt = require("jsonwebtoken");

exports.updateuser = async (req, res) => {
  try {
    const { ownerid } = req.body;
    // console.log("fields for update: ", req.body, " user id: ", userid);
    const updatefields = req.body;

    // console.log("values: ", updatefields);
    const updateuser = await usermodel.findById({ _id: ownerid });

    if (updateuser) {
      Object.assign(updateuser, updatefields);
      const result = await updateuser.save();

      const authtoken = await jwt.sign({ ...result._doc }, process.env.HASHKEY);
      const accesstoken = await jwt.sign(
        { ...result._doc },
        process.env.REFRESHKEY
      );
      console.log("token: \n", authtoken);

      res.cookie("access", accesstoken, {
        httpOnly: true,
      });
      res.send({
        result,
        message: "user updated successfully",
        authtoken,
      });
    }

    //   res.send({ message: "usercreated", user: createduser });
  } catch (error) {
    console.log("update user error: ", error.message);
    res.send({
      message: "error occured while updating user",
      err: error.message,
    });
  }
};
