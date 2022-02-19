const express = require("express");
const router = express.Router();
const metaControllers = require("../controllers/metaControllers");

router.get("/", metaControllers.metaverso);

module.exports = router;