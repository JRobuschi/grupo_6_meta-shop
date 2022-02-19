const express = require("express");
const router = express.Router();
const mineriaControllers = require("../controllers/mineriaControllers");

router.get("/", mineriaControllers.mineria);

module.exports = router;