const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

router.get("/", productControllers.productDetail);

module.exports = router;