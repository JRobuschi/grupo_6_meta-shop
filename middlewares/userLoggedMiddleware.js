function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;
//esta variable se comparte en toda la aplicacion.
    if (req.session && req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;

    }



    next();
}
//x cada cosa q tenga la aplicacion, cada cosa donde entres va a pasar x este middleware y va a preguntar si el usuario esta logueado
//este middlewarede aplicacion trabaja sobre la barra de navegacion estnando logueado el usuario hace diferentes cosas

module.exports = userLoggedMiddleware