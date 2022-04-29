const express = require("express");
const router = express.Router();
const metaControllers = require("../controllers/mainControllers");

router.get("/", metaControllers.metaverso);

module.exports = router;