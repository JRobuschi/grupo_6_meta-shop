const express = require("express");
const router = express.Router();
const almaControllers = require("../controllers/mainControllers");

router.get("/", almaControllers.almacenamiento);

module.exports = router;