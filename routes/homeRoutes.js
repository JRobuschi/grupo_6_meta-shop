const express = require("express");
const router = express.Router();
const homeControllers = require("../controllers/homeControllers");

router.get("/", homeontrollers.home);
router.get("/regiter", )

module.exports = router;