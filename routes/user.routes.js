const express = require("express");
const router = express.Router();
const { createuser,uploadphoto } = require("../controller/user/Usercreate.controller");
const { updateuser } = require("../controller/user/Userupdate.controller");
const {
  getuser,
  getusers,
  login,
} = require("../controller/user/Userread.controller");
const {
  firebasetokenlogin,
  firebasetokensignup,
  authorization,
} = require("../middleware/auth.middleware");
const{userphotomiddleware}=require("../middleware/uid.middleware")
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.get("/userprofiles", getusers);
router.get("/userprofile/:id", getuser);
router.get("/login", firebasetokenlogin, login);
router.post("/signup", firebasetokensignup, createuser);
router.post("/userphoto", authorization,userphotomiddleware, uploadphoto);
// router.post("/userprofile", createuser);
// router.post("/login", login);

router.patch("/update/", authorization, updateuser);

module.exports = router;
