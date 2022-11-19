const express = require("express");
const router = express.Router();
const { userticket } = require("../controller/tickets/tickets.controller");

router.post("/message", userticket);

module.exports = router;
