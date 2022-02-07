const express = require("express");
const router = express.Router();
const homeControllers = require("../controllers/homeControllers");

router.get("/", homeControllers.home);
router.get("/regiter", )

module.exports = router;