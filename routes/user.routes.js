const express = require("express");
const router = express.Router();
const { createuser } = require("../controller/user/Usercreate.controller");
const { updateuser } = require("../controller/user/Userupdate.controller");
const {
  getuser,
  getusers,
  login,
 
} = require("../controller/user/Userread.controller");
const {firebaselogintoken, authorization}=require('../middleware/auth.middleware')
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.get("/userprofiles", getusers);
router.get("/userprofile/:id", getuser);
router.get("/login",firebaselogintoken, login);
router.post("/userprofile", createuser);
// router.post("/login", login);

router.patch("/userprofile/:id",authorization, updateuser);

module.exports = router;
