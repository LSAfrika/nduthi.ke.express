const usermodel = require("../../models/User.model");

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

      res.send({ result, message: "user updated successfully" });
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
