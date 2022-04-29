const express = require("express");
const router = express.Router();
const monitoresControllers = require("../controllers/mainControllers");

router.get("/", monitoresControllers.monitores);

module.exports = router;