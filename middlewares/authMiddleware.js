function authMiddleware(req, res, next) {
    if( !req.session.userLogged) { //si no hay nadie en session te redirijo a login
        return res.redirect('/user/login');
    }
    next();
    }//si hay alguien en session podes seguir a las partes de estar logueado
    
    module.exports = authMiddleware; 

   