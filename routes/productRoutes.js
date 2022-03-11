const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
//const path = require("path");


router.get("/", productControllers.browse);

//router.get("/:id", productControllers.read);

router.get("/crear", productControllers.create);

router.get("/editar/:id", productControllers.edit);

router.post('/', productControllers.add)

router.put('/:id', productControllers.update)

router.delete('/:id', productControllers.delete)

module.exports = router;