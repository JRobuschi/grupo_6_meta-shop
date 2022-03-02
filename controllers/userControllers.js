let fs = require('fs');

let userController = {
    'register' : function (req, res) {
        res.render('register');
    },
    'login': function(req, res) {
        res.render('login')
    },
    'list': function(req, res) {
      let archivoJSON = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});
      //para leer el archivo es el readfilesync
      let users = JSON.parse(archivoJSON);//para descomprimir la info

      res.render('userList', {'users': users});
    },
    search: function (req, res) {
      let loQueBuscaElUsuario = req.query.search;

      let archivoJSON = fs.readFileSync('usuarios.json', {encoding: 'utf-8'});
      let users = JSON.parse(archivoJSON);

      /*res.send(loQueBuscaElUsuario);*/

      

      let usersResults = [];

      for (let i = 0; i < users.length; i++) {
        if (users[i].name.includes(loQueBuscaElUsuario)){
          usersResults.push(users[i]);
        }
      }
      res.render('userResults',{usersResults: usersResults})
    },
    create: function(req,res) {
      let usuario = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        email: req.body.email,
       }
       //guardar y redirigir
       //primero lleer que habia
       let archivoUsuario = fs.readFileSync('usuarios.json', {encoding: 'utf-8'} );
       let usuarios;
       if (archivoUsuario == '') {
          usuarios = [];
       } else {
          usuarios = JSON.parse(archivoUsuario);
       }
       
       usuarios.push(usuario);

       usuariosJSON = JSON.stringify(usuarios);

       fs.writeFileSync('usuarios.json', usuariosJSON)

      res.redirect("/users/list");


    },
    edit: function(req, res){
      let idUser = req.params.idUser;

      let users = [
        {id:1,name:'dario'},
        {id:2,name:'german'},     
        {id:3,name:'marce'},     
        {id:4,name:'diana'},     
        {id:5,name:'fidel'}     

      ];

      let userToEdit= users[idUser];
      res.render("userEdit", {userToEdit:userToEdit});
    }
};

module.exports = userController;
