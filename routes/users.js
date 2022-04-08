const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multerUser");
const path = require('path');   
const multer = require('multer')







const { body } = require ('express-validator'); // la variable body de validator en otros videos se llama check
const validations = [ //campos a validar y metodo de validacion// estos formularios no pueden estar vacios
    body ('email').notEmpty().withMessage('debe ingresar un mail').bail().isEmail().withMessage('debe ser fromato email'),
    body ('password').notEmpty().withMessage('debe ingresar un password'),
    body ('usuarios').custom((value, { req })=> {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        
        if (!file) {
            throw new Error('debes subir una imagen')
        } else {
            let fileExtension = path.extname(file.originalname);
        if (!acceptedExtensions.includes(fileExtension)){
            throw new Error (`las extensiones permitidas son ${acceptedExtensions.join(',')}`);
        }
    }
        return true;
    }),
   
];
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/usuarios');
    },
    filename: (req, file, cb)=> {
    let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, filename);
}
}) 

const uploadFile = multer ({ storage});

const usuariosControllers = require('../controllers/usuariosControllers');

const uploadUser = require('../middlewares/multerUser');




//const validationResult = require('express-validator').validationResult;
const check = require('express-validator').check;

//let {check, validationResult, body } = require('express-validator').validationResult; min 21.16

//let guestMiddleware = require('../middlewares/guestMiddleware');

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

router.get('/register', usuariosControllers.register) //min 21:19

router.post('/register', uploadFile.single('usuarios'), validations, usuariosControllers.processRegister) //min 21:19



//EDIT
router.get('/:id/edit', usuariosControllers.edit);
//router.put('/:id', usuariosControllers.update);

//LOGOUT(hay que configurarlo con cookies)
router.get('/logout', usuariosControllers.logout);

//GET
router.put('/:id', uploadUser.single('image'), usuariosControllers.update);

router.get('/:id/', usuariosControllers.profile); // lo saque x q me rompía el register


module.exports = router;