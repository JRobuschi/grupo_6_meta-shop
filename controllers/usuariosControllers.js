const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
const bcryptjs = require('bcryptjs');
const { validationResult, body } = require('express-validator');
const check = require('express-validator').check;
const User = require ('../models/User');

const usuariosControllers = {
    index: (req,res) => {
        return res.render('users/iniciarSesion');  	
    },

    login: (req, res) => {
       return res.render ('users/login'); //vista del login
    },

    register: (req, res) => {
       // res.cookie('testing', 'hola mundo', { maxAge: 1000* 30}) metodo del response para guardar algo en el navegador
        return res.render ('users/register');
    },

    processRegister: (req, res) => {
       const resultValidation = validationResult(req);
        
       if (resultValidation.errors.length > 0 ) {
             res.render('./users/register', { //nombre de la vista de registro
                errors: resultValidation.mapped(),
                oldData: req.body
            });
            
        }

        let userInDB = User.findByField('email', req.body.email);//buscaen la base el mail para no dejarte registrar 2 veces el mismo mail

        if (userInDB) { //si el usuario esta en base de datos error
            res.render('./users/register', {
            errors: {
                email: {
                    msg: 'este mail ya esta registrado'
                }
            },
            oldData: req.body// info q viaja e en el body para eldata mantiene la informacion q esta correcta en el formulario
        });

        }

        
        let userToCreate = {
            ...req.body, //spreadoperator "todo lo q traiga el body"
            password: bcryptjs.hashSync(req.body.password, 10), //encirptador del pas
            avatar: req.file.filename //renombra la imagen
        }

        
        let userCreated = User.create(userToCreate); //crea y redirije a login
        return res.redirect('/users/login')
    },


    login: (req, res) => {//formulario de login
        //console.log(req.cookies);
        //console.log(req.cookies.testing) del request llegan cookies, yo quiero la testing
        return res.render('users/login');
    },

    processLogin: (req, res) => {
        
        
        
        let userToLogin = User.findByField('email', req.body.email);
        //busca en el modelo si esta registrado el email
        if (userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password); //el metodo modulo bycript y el metodo comparesyn para validar el password q viene del body en el request en texto plano
            if(isOkThePassword) {
                delete userToLogin.password; //saca el password de las recurrencias en vistas de session para q no el pass no este llendo x todos lados
            if  (req.session){ //toda la informacion de session es lo q esta dando ok en userlogged
                req.session.userLogged = userToLogin}

            if (req.body.remember_user){//si en el request del body vino remember user
                res.cookie('userEmail', req.body.email, {maxAge: (1000* 60)*2})
                //en el response voy a setear una cookie q se llama userEmail y guarda el valor de lo que viene en el body del request la propiedad email y esa cookie dura 1 segundo x 1 minuto x 2 minutos
            }  
                
            
            return res.redirect ('profile');
               
            //};
                
            }//desde el IF en caso q el email no se encuentre
            return res.render('users/login', {
                errors: {
                    email:{
                        msg: 'los datos son incorrectos'
                    }
                }
            })
        }
        
        return res.render('users/login', {
            errors: {
                email:{
                    msg: 'no se encuentra el usuario'
                }
            }
        })
    
    },


    

    
    profile: (req,res) =>{
        //console.log(req.cookies.userEmail);
       return res.render ('users/userProfile', {
            user: req.session.userLogged
        });
    },
/*
    create: (req,res) => {
        const newUser =  req.body;
		const newUserImage = req.file;
	
		if (req.file && newUserImage.size < 3145728) {
			
		usuariosControllers.createNewUser(newUser,newUserImage)	
		
		users.push (newUser)

		usuariosControllers.dbReWrite()

		res.redirect ('/users')

	} else if (req.file && newUserImage.size > 3145729) {
		res.send('El archivo es demasiado pesado')
	} else {
		res.send ('No adjuntaste ninguna imagen')
	}
       
        

       

        
    },

    edit: (req,res) =>{
        const idToFind = req.params.id
        const usuario = users.find (p => p.id == idToFind)
        
         res.render ('users/userProfile', {usuario})
    },
    update: (req,res) =>{
        const idToFind = req.params.id
        const productIndex = users.findIndex(user => user.id == idToFind)
        const editedProduct = req.body;

        users[productIndex].nombre = editedProduct.nombre;
        users[productIndex].apellido = editedProduct.apellido;
        users[productIndex].email = editedProduct.email;
        if (req.body.pdtCategori == ''){
            users[productIndex].pdtCategori = users[productIndex].pdtCategori;
        }else{
            users[productIndex].pdtCategori = editedProduct.pdtCategori
        }
        users[productIndex].pdtDescription = editedProduct.pdtDescription
        if(req.file) {
            users[productIndex].pdtImg = req.file.filename;
        }
        controllers.dbReWrite()

        return res.redirect('/users/userProfile')
    },*/
    logout: (req,res) =>{
        res.clearCookie('userEmail');//si no destruis la cookie quedas logueado por el tiempo de ejecucion de maxage
        req.session.destroy();
        return res.redirect("/")
    },

    dbReWrite() { 
		fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
	},
    createNewUser: function (newUser,newUserImage) {

		newUser.id = usuariosControllers.asignIdToUser();
		newUser.image = newUserImage.filename;
		
		
	},
	asignIdToUser: function () {
		return users[users.length -1].id +1;
	}
    

}

module.exports = usuariosControllers;