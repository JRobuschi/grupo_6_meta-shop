function guestMiddleware(req, res, next) {
if( req.session && req.session.userLogged)  {
    return res.redirect('/users/userProfile');
} 
next();
//If req session & & req session user logged
}

module.exports = guestMiddleware; 