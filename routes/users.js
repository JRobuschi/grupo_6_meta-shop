const express = require('express');
const router = express.Router();
const upload = require("../middlewares/multer");
const path = require('path');   
const multer = require('multer')
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require ('express-validator');//{destructuring de la prop body}funcion body de validator, nos permite validar los cargos del formulario y elegir que queremos validar // la variable body de validator en otros videos se llama check
//campos a validar y metodo de validacion// estos formularios no pueden estar vacios
const usuariosControllers = require('../controllers/usuariosControllers');


<<<<<<< HEAD

 
const validations = [ 
    body ('email').notEmpty().withMessage('debe ingresar un mail').bail().isEmail().withMessage('debe ser formato email'),
=======
 //validador
const validations = [  //este array es el validador X Q SON MUCHAS VALIDACIONES
    body ('email').notEmpty().withMessage('debe ingresar un mail').bail().isEmail().withMessage('debe ser fromato email'),//notEmpty... son metodos .iseemail debe ser un email
>>>>>>> 9100abd864e34d9517914842c724510888ff43b5
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
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images/usuarios');
    },
    filename: (req, file, cb)=> {
    let filename = `${Date.now()}_img${path.extname(file.originalname)}`;
    cb(null, filename);
}
}) 

const uploadFile = multer ({ storage });



//const uploadUser = require('../middlewares/multerUser');




//const validationResult = require('express-validator').validationResult;
//const check = require('express-validator').check;

//let {check, validationResult, body } = require('express-validator').validationResult; min 21.16

//let guestMiddleware = require('../middlewares/guestMiddleware');

/* GET users listing. */
router.get('/', usuariosControllers.index);

// router.get('/register', guestMiddleware, usuariosControllers.register); // no te deja re registrrar cuando ya te logueaste
router.get('/register', usuariosControllers.register);

<<<<<<< HEAD
router.post('/register', uploadFile.single('usuarios'), validations, usuariosControllers.create) //min 21:19
// router.post('/register',guestMiddleware, usuariosControllers.create);
=======
router.post('/register', uploadFile.single('usuarios'), validations, usuariosControllers.processRegister)  //aca esta el validator de multer
>>>>>>> 9100abd864e34d9517914842c724510888ff43b5

router.get('/edit/:id', usuariosControllers.edit);

router.post('/update', usuariosControllers.update);

router.get('/login', guestMiddleware, usuariosControllers.login);
router.post('/login', [
    body('email').isEmail().withMessage('Email invalido'),
    body('password').isLength({min: 4}).withMessage('minimo 4 digitos')
], usuariosControllers.processLogin);




/*router.get('/chek', function (req,res){
    if(req.session.userLogged == undefined) {
        res.send('no estas logueado, bo');
    } else {
        res.send('el usuario logueado es' + req.session.userLogged.email);

    }
})*/


//CREATE
//router.get('/', usuariosControllers.create);
//router.post('/', upload.single('image'), usuariosControllers.create);

//GET




//EDIT

// router.put('/:id', usuariosControllers.update);

//LOGOUT(hay que configurarlo con cookies)


//GET
//router.put('/:id', upload.single('image'), usuariosControllers.update);

router.get('/profile', authMiddleware, usuariosControllers.profile); //1:01 en la hora y 1 minuto saca el id y dice q no lo necesita
//si hay alguien en session sigue hacia profile
router.get('/logout', usuariosControllers.logout);

module.exports = router; //abandono en 1hs20minutos