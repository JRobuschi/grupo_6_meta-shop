function guestMiddleware(req, res, next) {
res.locals.isLogged
if( req.session.userLogged)  {
    
    return res.redirect('/users/userProfile');
} 
next();

}

module.exports = guestMiddleware; 