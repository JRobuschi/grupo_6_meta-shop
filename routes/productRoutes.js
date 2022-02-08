const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");

router.get("/productDetail", productDetail.productDetail);

module.exports = router;