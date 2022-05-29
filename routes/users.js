const express = require('express');
const router = express.Router();
const uploadUser = require("../middlewares/multerUser");
const path = require('path');   
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require ('express-validator');//{destructuring de la prop body}funcion body de validator, nos permite validar los cargos del formulario y elegir que queremos validar // la variable body de validator en otros videos se llama check
//campos a validar y metodo de validacion// estos formularios no pueden estar vacios
const usuariosControllers = require('../controllers/usuariosControllers');


 //validador
const validations = [  //este array es el validador X Q SON MUCHAS VALIDACIONES
    body ('email').notEmpty().withMessage('debe ingresar un mail').bail().isEmail().withMessage('debe ser fromato email'),//notEmpty... son metodos .iseemail debe ser un email
    body ('password').notEmpty().withMessage('debe ingresar un password'),
    body ('usuarios').custom((value, { req })=> { //nombre de los campos del formulario que queremos validar y que tipo de validacion implementar
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

/* GET users listing. */
router.get('/', usuariosControllers.index);

//CREATE USER//
router.get('/register', guestMiddleware, usuariosControllers.register);
router.post('/register', uploadUser.single('image'), validations, usuariosControllers.create) //min 21:19 aca esta el validator de multer

//LOGIN USER//
router.get('/login', usuariosControllers.login);
router.post('/login', usuariosControllers.processLogin);

//EDIT USER//
router.get('/edit/:id', authMiddleware, usuariosControllers.edit);
router.post('/edit/:id',     authMiddleware, uploadUser.single('image'), usuariosControllers.update);

//DETAIL USER//
router.get('/profile', authMiddleware, usuariosControllers.profile); //1:01 en la hora y 1 minuto saca el id y dice q no lo necesita
router.get('/logout', usuariosControllers.logout);

module.exports = router; //abandono en 1hs20minutos