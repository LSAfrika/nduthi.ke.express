const express = require("express");
const router = express.Router();
const { dealerpaymentauthorization } = require("../middleware/auth.middleware");
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
  Dealerstkcallback,
  Dealerstkpush,
} = require("../mpesa/mpesa.payments");

//* ADD  PARAMS ID TOGET SPECIFICUSER
//* authtoken
router.post("/stkpush", dealerpaymentauthorization, authtoken, stkpush);
router.post(
  "/stkpushdealer",
  dealerpaymentauthorization,
  authtoken,
  Dealerstkpush
);

router.get("/registerurls", authtoken, registerurl);
router.get("/testaccesstoken", authtoken, getaccesstoken);
router.get("/simulatepaybill", authtoken, simulatepaybill);
router.get("/success", stkcallbacksuccess);

router.post("/stkcallback", stkcallback);
router.post("/Dealerstkcallback", Dealerstkcallback);
router.post("/validation", validation);
router.post("/confirmation", confirmation);

module.exports = router;
