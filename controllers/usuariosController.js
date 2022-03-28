const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))



const usuariosControllers = {
    register: (req,res) => {
        res.render('users/iniciarSesion');  	
    },
    create: (req,res) => {
        
        // res.send(req.body);
        let user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password
        }
        let userJson = JSON.stringify(user);
        fs.appendFileSync(filePath, userJson);

        res.redirect('/users/iniciarSesion');
        // res.send(nombre,apellido,email, password);


       

        
    }

    

}

module.exports = usuariosControllers;