const usermodel = require("../../models/User.model");

exports.createuser = async (req, res) => {
  try {
    const { username, email, uid, phone, account } = req.body;

    console.log("values: ", username, email, uid, phone);
    const firebaseuid = await usermodel.findOne({ email: email });

    if (firebaseuid) {
      console.log("user is in the data base");
      return res.status(409).send({ message: "user already exists" });
    }
    const newuser = new usermodel({
      username,
      email,
      uid,
      phone,
      account,
    });
    const createduser = await newuser.save();

    res.send({ message: "usercreated", user: createduser });
  } catch (error) {
    console.log("create user error: ", error.message);
    res.send({
      message: "erro at create user",
      err: error.message,
    });
  }
};
