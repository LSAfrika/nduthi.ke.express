const usermodel = require("../../models/User.model");

exports.updateuser = async (req, res) => {
  try {
    const userid = req.params.id;
    // console.log("fields for update: ", req.body, " user id: ", userid);
    const updatefields = req.body;

    // console.log("values: ", updatefields);
    const updateuser = await usermodel.findById({ _id: userid });

    if (updateuser) {
      Object.assign(updateuser, updatefields);
      const result = await updateuser.save();

      res.send({ result });
    }

    //   res.send({ message: "usercreated", user: createduser });
  } catch (error) {
    console.log("update user error: ", error.message);
    res.send({
      message: "update at create user",
      err: error.message,
    });
  }
};
