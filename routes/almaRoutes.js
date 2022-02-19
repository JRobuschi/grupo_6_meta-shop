const express = require("express");
const router = express.Router();
const almaControllers = require("../controllers/almaControllers");

router.get("/", almaControllers.almacenamiento);

module.exports = router;