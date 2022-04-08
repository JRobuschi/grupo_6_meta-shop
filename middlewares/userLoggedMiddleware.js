function userLoggedMiddleware(req, res,next) {
    res.locals.isLogged = false;

    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged

    }



    next();
}

//1:27 trabaja sobre la desaparicion del incono de usuario ya logueado

module.exports = userLoggedMiddleware