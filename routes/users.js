var express = require('express');
const usuariosControllers = require('../controllers/usuariosController');
var router = express.Router();

/* GET users listing. */
router.get('/', usuariosControllers.index);

//CREATE
router.post('/', usuariosControllers.create);

//GET
router.get('/:id/', usuariosControllers.profile);

//EDIT
router.get('/:id/edit', usuariosControllers.edit);
router.put('/:id', usuariosControllers.update);

//LOGOUT(hay que configurarlo con cookies)
router.get('/logout', usuariosControllers.logout);

module.exports = router;
