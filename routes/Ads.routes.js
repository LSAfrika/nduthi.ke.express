const express = require("express");

const router = express.Router();
const { createad } = require("../controller/Ads/Adcreate.controller");
const {
  getad,
  getallads,
  getalluserads,
  similarads,
  getalluseradsdashboard,
  getfilteredads,
} = require("../controller/Ads/Adread.controller");
const {
  updatead,
  imagesupdate,
  viewcounter,
} = require("../controller/Ads/Adupdate.controller");
const { dirmiddleware } = require("../middleware/uid.middleware");
const { authorization } = require("../middleware/auth.middleware");
const { adcheckguard } = require("../middleware/adcheck.middleware");
//* ADD  PARAMS ID TOGET SPECIFICUSER

router.post("/create", adcheckguard, dirmiddleware, createad);
router.post("/photoupdate/:id", imagesupdate);

router.get("/get/filter/", getfilteredads);

router.get("/get/:id", getad);
router.get("/getuserads/:id", getalluserads);
router.get("/getuseradsdashboard/:id", getalluseradsdashboard);
router.get("/get/", getallads);
router.get("/similarads/", similarads);

router.patch("/update/:id", updatead);
router.patch("/updatecounter/:id", viewcounter);
router.delete("/delete/:id");

module.exports = router;
