const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname,'../data/users.json');
const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
const bcrypt = require('bcryptjs');



const usuariosControllers = {
    index: (req,res) => {
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
        

       

        
    },
    profile: (req,res) =>{
        const idToFind = req.params.id
        const user = users.find (p => p.id == idToFind)

        return res.render ('users/perfil', {user})
    },
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
		fs.writeFileSync(filePath, JSON.stringify(productsArray, null, 2))
	},

    

}

module.exports = usuariosControllers;