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

        if (userInDB) {
            res.render('./users/register', {
            errors: {
                email: {
                    msg: 'este mail ya esta registrado'
                }
            },
            oldData: req.body
        });

        }

        
        let userToCreate = {
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10), //encirptador del pas
            avatar: req.file.filename //renombra la imagen
        }

        
        let userCreated = User.create(userToCreate); //crea y redirije a login
        return res.redirect('/users/login')
    },


    login: (req, res) => {
        return res.render('users/login');
    },

    processLogin: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email);
        //busca en el modelo si esta registrado el email
        if (userToLogin){
            let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password); //el metodo modulo bycript y el metodo comparesyn para validar el
            if(isOkThePassword) {
                delete userToLogin.password; //saca el password de las recurrencias en vistas de session
            if  (req.session){
                req.session.userLogged = userToLogin}
                
                return res.redirect ('/users/userProfile');
                //return res.redirect ('/users/userProfile')
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
       return res.render ('userProfile', {
            user: req.session.userLogged
        });
    },

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
    },
    logout: (req,res) =>{
        //res.clearCookie('email');
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