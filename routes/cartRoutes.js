const express = require("express");
const router = express.Router();
const cartControllers = require("../controllers/mainControllers");

router.get("/", cartControllers.cart);

module.exports = router;