const express = require("express");
const router = express.Router();
const footControllers = require("../controllers/mainControllers");

router.get("/", footControllers.foot);

module.exports = router;