const express = require("express");
const router = express.Router();
const productDescription = require("../controllers/productDescriptionControllers");

router.get("/productDetail", productDescription.productDetail);

module.exports = router;