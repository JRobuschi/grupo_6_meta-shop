const express = require("express");
const router = express.Router();
const productdescriptionControllers = require("../controllers/productdescriptionControllers");

router.get("/", productDetailControllers.productDetail);

module.exports = router;