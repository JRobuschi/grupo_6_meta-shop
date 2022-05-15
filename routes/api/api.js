const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/api/Product");
const userControllers = require("../../controllers/api/apiUsers");

router.get("/products", controllers.list);
router.get("/products/:id", controllers.show);




module.exports = router;