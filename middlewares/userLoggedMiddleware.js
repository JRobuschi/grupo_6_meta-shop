const User = require('../models/User'); //tengo que traer la base de datos para buscar el usuario q me va a dejaar usar la cookie

function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
//si esto da falso no se muestra informacion de usuario en la navbar, en el form se muestra el uso del midleware
    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie)

//console.log(userFromCookie);

if (userFromCookie) {// si tengo el usuario de la cookie quiero ese usuario en session
    req.session.userLogged = userFromCookie; 
}
//cuando se ejecute el if
//locals dice q esta variable se comparte en toda la aplicacion.
    if (req.session && req.session.userLogged) { //tengo alguien en session?
        res.locals.isLogged = true; //si, entonces alguien esta loggueado
        res.locals.userLogged = req.session.userLogged;//entonces puedo mostrar la info del user en el perfil automatico

    }
    

    //console.log(userFromCookie);

    next();
}
//x cada cosa q tenga la aplicacion, cada cosa donde entres va a pasar x este middleware y va a preguntar si el usuario esta logueado
//este middlewarede aplicacion trabaja sobre la barra de navegacion estnando logueado el usuario hace diferentes cosas

module.exports = userLoggedMiddleware