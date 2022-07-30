const express = require("express");
const router = express.Router();
const { createuser } = require("../controller/user/Usercreate.controller");
const { updateuser } = require("../controller/user/Userupdate.controller");
const { getuser, getusers } = require("../controller/user/Userread.controller");
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.get("/userprofiles", getusers);
router.get("/userprofile/:id", getuser);
router.post("/userprofile", createuser);

router.patch("/userprofile/:id", updateuser);

module.exports = router;
