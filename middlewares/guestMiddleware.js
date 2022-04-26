function guestMiddleware(req, res, next) {
if( req.session && req.session.userLogged)  {//si hay alguien en sesion?
    return res.redirect('/users/userProfile');
} //mandalo al perfil
next();//si no hay nadie en sesion continua normalmente las peticiones
//If req session & & req session user logged
}

module.exports = guestMiddleware; 

//este middleware evita q te puedas registrar o loguear nuevamente una vez ya logueado

//este midleware evita q veas la vista de login y registger una vez q te logueaste