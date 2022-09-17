const express = require("express");
const { dealerpaymentauthorization } = require("../middleware/auth.middleware");
const router = express.Router();
const { authtoken } = require("../mpesa/accesstoken.generator");
const {
  getaccesstoken,
  stkpush,
  stkpushdealer,
  stkcallback,
  simulatepaybill,
  registerurl,
  validation,
  confirmation,
  stkcallbacksuccess,
} = require("../mpesa/mpesa.payments");

//* ADD  PARAMS ID TOGET SPECIFICUSER
//* authtoken
router.post("/stkpush", authtoken, stkpush);
router.post(
  "/stkpushdealer",
  dealerpaymentauthorization,
  authtoken,
  stkpushdealer
);

router.get("/registerurls", authtoken, registerurl);
router.get("/testaccesstoken", authtoken, getaccesstoken);
router.get("/simulatepaybill", authtoken, simulatepaybill);
router.get("/success", stkcallbacksuccess);

router.post("/stkcallback", stkcallback);
router.post("/validation", validation);
router.post("/confirmation", confirmation);

module.exports = router;
