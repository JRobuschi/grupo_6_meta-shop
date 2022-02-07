const controllers = {
    home: (req, res) => {
        return res.send('home');
    },
    register: (req, res) => {
        return res.send('register')
    },
    cart: (req, res) => {
        return res.send('cart')
    }
}

module.exports = controllers;