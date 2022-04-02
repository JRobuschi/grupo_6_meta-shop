var express = require('express');
var router = express.Router();
const upload = require ("../middlewares/multer");

const usuariosControllers = require('../controllers/usuariosControllers');

/* GET users listing. */
router.get('/', usuariosControllers.index);

//CREATE
//router.get('/', usuariosControllers.create);
router.post('/', upload.single('image'), usuariosControllers.create);

//GET
router.get('/:id/', usuariosControllers.profile);

//EDIT
router.get('/:id/edit', usuariosControllers.edit);
//router.put('/:id', usuariosControllers.update);
router.put('/:id', upload.single('image'), usuariosControllers.update);

//LOGOUT(hay que configurarlo con cookies)
router.get('/logout', usuariosControllers.logout);

module.exports = router;
