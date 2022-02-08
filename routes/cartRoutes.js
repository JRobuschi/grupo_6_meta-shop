const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/cartControllers");

router.get("/cart", cartControllers.cart);

module.exports = router;