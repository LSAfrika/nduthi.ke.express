const express = require("express");
const { fileuploader } = require("../middleware/multer.middleware");

const router = express.Router();
const { createad } = require("../controller/Ads/Adcreate.controller");
const { getad, getallads } = require("../controller/Ads/Adread.controller");
const { updatead } = require("../controller/Ads/Adupdate.controller");

//* ADD  PARAMS ID TOGET SPECIFICUSER

router.post("/create", fileuploader, createad);

router.get("/get/:id", getad);
router.get("/get/", getallads);

router.patch("/update/:id", updatead);
router.delete("/delete/:id");

module.exports = router;
