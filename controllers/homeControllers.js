const controllers = {
    home: (req, res) => {
        return res.render('/users/home');
    },
    register: (req, res) => {
        return res.render('register');
    },
    cart: (req, res) => {
        return res.render('cart');
    }
}

module.exports = controllers;