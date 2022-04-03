function guestMiddleware(req, res, next) {
if( req.session.usuarioLogueado == undefined) {
    next();
} else {
    res.send('Ud. esta navegando como invitado');
}
}

module.exports = guestMiddleware; 