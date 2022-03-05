const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
//const path = require("path");


router.get("/", productControllers.productDetail);
//router.get("/:id", productControllers.mostrarPorId);
//router.get("/crear", productControllers.crearProducto);
//router.get("/editar", productControllers.editarProducto);

module.exports = router;