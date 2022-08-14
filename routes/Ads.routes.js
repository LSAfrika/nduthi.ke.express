const express = require("express");

const router = express.Router();
const { createad } = require("../controller/Ads/Adcreate.controller");
const {
  getad,
  getallads,
  getalluserads,
  similarads,
} = require("../controller/Ads/Adread.controller");
const {
  updatead,
  viewcounter,
} = require("../controller/Ads/Adupdate.controller");
const { dirmiddleware } = require("../middleware/uid.middleware");
const {authorization}=require('../middleware/auth.middleware')
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.post("/create",authorization, dirmiddleware, createad);

router.get("/get/:id", getad);
router.get("/getuserads/:id", getalluserads);
router.get("/get/", getallads);
router.get("/similarads/", similarads);

router.patch("/update/:id",authorization, updatead);
router.patch("/updatecounter/:id", viewcounter);
router.delete("/delete/:id");

module.exports = router;
