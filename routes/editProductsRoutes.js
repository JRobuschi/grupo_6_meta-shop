const express = require("express");
const router = express.Router();
const editProductsControllers = require("../controllers/editProductsControllers");
const path = require("path")

router.get("/", editProductsControllers.editProducts);

module.exports = router;