const express = require("express");
const router = express.Router();
const { authtoken } = require("../mpesa/accesstoken.generator");
const {
  getaccesstoken,
  stkpush,
  stkcallback,
  simulatepaybill,
  registerurl,
  validation,
  confirmation,
  stkcallbacksuccess,
} = require("../mpesa/mpesa.payments");

//* ADD  PARAMS ID TOGET SPECIFICUSER
//* authtoken
router.get("/stkpush", authtoken, stkpush);

router.get("/registerurls", authtoken, registerurl);
router.get("/testaccesstoken", authtoken, getaccesstoken);
router.get("/simulatepaybill", authtoken, simulatepaybill);
router.get("/success", stkcallbacksuccess);

router.post("/stkcallback", stkcallback);
router.post("/validation", validation);
router.post("/confirmation", confirmation);

module.exports = router;
