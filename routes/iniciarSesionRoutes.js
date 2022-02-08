const express = require("express");
const router = express.Router();
const iniciarSesionControllers = require("../controllers/iniciarSesionControllers");

router.get("/register", iniciarSesionControllers.register);

module.exports = router;