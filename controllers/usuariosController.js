const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
const bcrypt = require('bcryptjs');



const usuariosControllers = {
    register: (req,res) => {
        return res.render('users/iniciarSesion');  	
    },
    create: (req,res) => {
        
        // res.send(req.body);
        let user = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10)
        }
        
        
        users.push(user);
        let userJson = JSON.stringify(users);
        fs.writeFileSync(filePath, userJson);

        res.redirect('/users/register')
        // res.send(nombre,apellido,email, password);
        

       

        
    }

    

}

module.exports = usuariosControllers;