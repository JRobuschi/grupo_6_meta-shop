
const db = require ('../db/models');
const User = db.User;

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
//si esto da falso no se muestra informacion de usuario en la navbar, en el form se muestra el uso del midleware
    let emailInCookie = req.cookies.userEmail;
    if(!emailInCookie){
       return res.render('users/login') 
    }
    let userFromCookie = await User.findOne({
        where: {
            email: emailInCookie
        }
    })

//console.log(userFromCookie);

if (userFromCookie) {// si tengo el usuario de la cookie quiero ese usuario en session
    req.session.userLogged = userFromCookie; 
    res.locals.isLogged = true; //si, entonces alguien esta loggueado
    res.locals.userLogged = req.session.userLogged;
    next();//entonces puedo mostrar la info del user en el perfil automatico
} else {
    res.render('404-page')
}
//cuando se ejecute el if
//locals dice q esta variable se comparte en toda la aplicacion.
    

    //console.log(userFromCookie);

}
//x cada cosa q tenga la aplicacion, cada cosa donde entres va a pasar x este middleware y va a preguntar si el usuario esta logueado
//este middlewarede aplicacion trabaja sobre la barra de navegacion estnando logueado el usuario hace diferentes cosas

module.exports = userLoggedMiddleware