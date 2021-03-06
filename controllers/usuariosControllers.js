// const productos = await db.Product.findAll({
//     include: ["category"]
// })
// return res.send(productos)
// const users = await User.findAll({
//     include: ['relUserCart']
// })

// return res.send(users);
// const filePath = path.join(__dirname,'../data/users.json');
// const users = JSON.parse(fs.readFileSync(filePath, {encoding: 'utf8'}))
// const fs = require('fs');
const path = require("path");
const bcryptjs = require("bcryptjs");
const { validationResult, body } = require("express-validator");
// const check = require('express-validator').check;
const db = require("../db/models");
const User = db.User;

const usuariosControllers = {
  index: (req, res) => {
    return res.render("users/iniciarSesion");
  },

  login: (req, res) => {
    return res.render("users/login");
  },

  register: (req, res) => {
    return res.render("users/register");
  },
  create: async (req, res) => {
    const data = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcryptjs.hashSync(req.body.password, 10),
      image: "/images/usuarios/" + req.file.filename,
    };
    console.log(data);
    try {
      await User.create(data);
      return res.render("users/login");
    } catch (err) {
      return res.send(err);
    }
  },
  edit: async (req, res) => {
    const idUser = req.params.id;
    
    const userToEdit = await User.findByPk(idUser,{
        include: {
            all: true
        }
    });

    const datosParaVista = {
      User: userToEdit
    }
    
    res.render("users/userProfile", datosParaVista);
  },
  update: async (req, res) => {
    const idUser = req.params.id;
    const editedUser = req.body;
    const userToEdit = await User.findByPk(idUser);

    //FILE 
    console.log("file->",req.file);
    //FILE

    userToEdit.nombre = editedUser.nombre;
    userToEdit.apellido = editedUser.apellido;
    userToEdit.email = editedUser.email;

    if(req.file) {
        userToEdit.image = "/images/usuarios/" + req.file.filename;
    }
    
    await userToEdit.save();
    // await User.update(req.body, {
    //   where: {
    //     idUser: idUser
    //   }
    // });
    const usuarioActualizado = await User.findByPk(idUser);

    res.render("users/userProfile", { User: usuarioActualizado });
  },
  processRegister: async (req, res) => {
    //valida la informacion antes de crear el usuario
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      res.render("./users/register", {
        //nombre de la vista de registro
        errors: resultValidation.mapped(), //a la variable errors, aca llegan todos los errores del formulario, mapped es un iterador de arrays
        oldData: req.body, //los datos viejos
      });
    } //aca hay que guiar hacia la base de datos
    //antes  de crear el usuario busca que el email no este registrado en la base de datos
    let userInDB = await User.findOne({
      where: {
        email: req.body.email,
      },
    }); //busca en la base el mail para no dejarte registrar 2 veces el mismo mail

    if (userInDB) {
      //si el usuario esta en base de datos retorname error
      res.render("./users/register", {
        errors: {
          //objeto literal que tiene otro objeto literal desde expressvalidator y el mensaje si ya esta registrado es:
          email: {
            msg: "este mail ya esta registrado",
          },
        },
        oldData: req.body, // info q viaja e en el body para manttener la informacion q esta correcta en el formulario
      });
    }

    //crea el usuario
    let userToCreate = {
      ...req.body, //spreadoperator "todo lo q traiga el body"
      password: bcryptjs.hashSync(req.body.password, 10), //encirptador del pass y comparador del password y pisa al password para q no sea visible
      avatar: req.file.filename, //renombra la imagen
    };

    let userCreated = User.create(userToCreate);
    console.log(userCreated); //crea y redirije a login
    return res.redirect("/users/login");
  },
  processLogin: async (req, res) => {
    let userToLogin = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    //busca en el modelo si esta registrado el email
    if (userToLogin) {
      //comparesync valida el password que ya esta hasheado
      let isOkThePassword = bcryptjs.compareSync(
        req.body.password,
        userToLogin.password
      );
      //el metodo modulo bycript y el metodo comparesyn para validar el password q viene del body en el request en texto plano
      if (isOkThePassword) {
        delete userToLogin.password; //saca el password de las recurrencias en vistas de session para q no el pass no este yendo x todos lados
        // if  (req.session){ // se crea en session a userlogged a partir de toda la informacion de session q esta dando ok
        // req.session.userLogged = userToLogin} //requiere instalarese el modulo session desde el app.
        //la session se destruye cuando cerras el navegador
        // if (req.body.remember_user){//si en el request del body vino remember user
        res.cookie("userEmail", req.body.email, { maxAge: 1000 * 60 * 100 });
        //en el response voy a setear una cookie q se llama userEmail y guarda el valor de lo que viene en el body del request la propiedad email y esa cookie dura 1 segundo x 1 minuto x 2 minutos
        // }
      }

      //cuando esta todo bien vas al profile

      return res.redirect("/users/profile");

      // //};

      // }//desde el IF en caso q el email no se encuentre
      // return res.send(userToLogin);
      return res.render("users/login", {
        errors: {
          //los errores vienen de los ejs del formulario
          email: {
            msg: "los datos son incorrectos",
          },
        },
      });
    }

    return res.render("users/login", {
      errors: {
        email: {
          msg: "no se encuentra el usuario",
        },
      },
    });
    return res.send(userToLogin);
  },

  profile: (req, res) => {
    //en la vista imprimi la info que te llega del userloggued, session se comparte en toda la app
    
    res.render("users/userProfile", {
      User: req.session.userLogged,
    });
    console.log(req.session.userLogged)
    
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
  logout: (req, res) => {
    res.clearCookie("userEmail", { path: "/" }); //si no destruis la cookie quedas logueado por el tiempo de ejecucion de maxage
    req.session.destroy(); // borra todos los datos de session
    return res.redirect("/"); // y te redirije al home
  },

  dbReWrite() {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  },
  createNewUser: function (newUser, newUserImage) {
    newUser.id = usuariosControllers.asignIdToUser();
    newUser.image = newUserImage.filename;
  },
  asignIdToUser: function () {
    return users[users.length - 1].id + 1;
  },
};

module.exports = usuariosControllers;
