function authMiddleware(req, res, next) {
    if( req.session.usuarioLogueado == undefined) {
        next();
    } else {
        res.send('Ud. esta navegando como usuario registrado, bienvenido');
    }
    }
    
    module.exports = authMiddleware; 