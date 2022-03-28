var express = require('express');
const usuariosControllers = require('../controllers/usuariosController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/register', usuariosControllers.register);
router.post('/guardar', usuariosControllers.create);

module.exports = router;
