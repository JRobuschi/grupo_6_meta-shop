const db = require ('../db/models');
const User = db.User;

async function setLocalsMiddleware(req, res, next) {
    res.locals.isLogged = false;
//si esto da falso no se muestra informacion de usuario en la navbar, en el form se muestra el uso del midleware
    let emailInCookie = req.cookies.userEmail;
    if(!emailInCookie) {
        return next();
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
}

}

module.exports = setLocalsMiddleware