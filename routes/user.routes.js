const express = require("express");
const router = express.Router();
const { createuser } = require("../controller/user/Usercreate.controller");
const { updateuser } = require("../controller/user/Userupdate.controller");
const { getuser } = require("../controller/user/Userread.controller");
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.post("/userprofile", createuser);
router.get("/userprofile/:id", getuser);

router.patch("/userprofile/:id", updateuser);

module.exports = router;
