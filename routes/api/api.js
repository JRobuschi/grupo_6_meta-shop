const express = require("express");
const router = express.Router();
const controllers = require("../../controllers/api/Product");
const userControllers = require("../../controllers/api/apiUsers");

router.get("/products", controllers.list);
router.get("/products/:id", controllers.show);

router.get('/users', userControllers.list)
router.get('/users/:id', userControllers.show)
router.post('/users', userControllers.store)

//router.delete('/:id', controller.delete)
//router.get('/search', controller.search)

module.exports = router;