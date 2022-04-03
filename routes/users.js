var express = require('express');
var router = express.Router();
const upload = require ("../middlewares/multerUser");

const usuariosControllers = require('../controllers/usuariosControllers');
const uploadUser = require('../middlewares/multerUser');

const validationResult = require('express-validator').validationResult;
const check = require('express-validator').check;


/* GET users listing. */
router.get('/', usuariosControllers.index);

router.get('/login', usuariosControllers.login);
router.post('/login', [
    check('email').isEmail().withMessage('Email invalido'),
    check('password').isLength({min: 4}).withMessage('minimo 4 digitos')
], usuariosControllers.processLogin);

router.get('/chek', function (req,res){
    if(req.session.usuarioLogueado == undefined) {
        res.send('no estas logueado, bo');
    } else {
        res.send('el usuario logueado es' + req.session.usuarioLogueado.email);

    }
})
//CREATE
//router.get('/', usuariosControllers.create);
router.post('/', upload.single('image'), usuariosControllers.create);

//GET
router.get('/:id/', usuariosControllers.profile);

//EDIT
router.get('/:id/edit', usuariosControllers.edit);
//router.put('/:id', usuariosControllers.update);
router.put('/:id', uploadUser.single('image'), usuariosControllers.update);

//LOGOUT(hay que configurarlo con cookies)
router.get('/logout', usuariosControllers.logout);




module.exports = router;
