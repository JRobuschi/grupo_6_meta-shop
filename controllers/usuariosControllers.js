const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
const bcrypt = require('bcryptjs');
const { validationResult, body } = require('express-validator');
const check = require('express-validator').check;


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
                oldData: req.body,
                
            });
            
        }
        
          return  res.send('OK Datos')
        
       
    },
    processLogin: (req, res) => {//13.58 minutos hay algo q no entiendo
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let usersJSON = fs.readFileSync('data/users.json', {encoding:'utf-8'});
            let users;
            if (usersJSON == '') {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }

            for (let i = 0; i < users.length; i++ ) {
                if (users [i].email == req.body.email) {
                    if(bcrypt.compareSync(req.body.password, users[i].password)) {
                        let usuarioALoguearse = users[i];
                        break;
                    }
                }
            }

            if (usuarioALoguearse == undefined) {
                return res.render('login', {errors: [
                    {msg: 'credenciales invalidas'}                  
                ]});

            }

            req.session.usuarioLogueado = usuarioALoguearse;
            res.render('logueado ok');
        } else {
            return res.render('login', {errors: errors.errors});
        }
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
    /*profile: (req,res) =>{
        const idToFind = req.params.id
        const user = users.find (p => p.id == idToFind)

        return res.render ('users/perfil', {user})
    },*/

    

    edit: (req,res) =>{
        const idToFind = req.params.id
        const usuario = users.find (p => p.id == idToFind)
        
         res.render ('users/editarPerfil', {usuario})
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

        return res.redirect('/users')
    },
    logout: (req,res) =>{
        res.clearCookie('email');
        req.session.destroy();
        return res.redirect("/users")
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