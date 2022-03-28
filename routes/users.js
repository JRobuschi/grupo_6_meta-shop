var express = require('express');
const usuariosControllers = require('../controllers/usuariosController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

<<<<<<< HEAD
=======

>>>>>>> 8e0c3627a43a30acfc9ae355907924847f7634d7
router.get('/register', usuariosControllers.register);
router.post('/guardar', usuariosControllers.create);

module.exports = router;
