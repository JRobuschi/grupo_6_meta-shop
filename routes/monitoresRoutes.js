const express = require("express");
const router = express.Router();
const monitoresControllers = require("../controllers/monitoresControllers");

router.get("/", monitoresControllers.monitores);

module.exports = router;