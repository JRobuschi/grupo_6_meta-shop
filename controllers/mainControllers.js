const controllers = {

    almacenamiento: (req,res) => {
        return res.render('products/almacenamiento');
    },

    cart: (req, res) => {
        return res.render('products/cart');
    },

    foot: (req, res) => {
        return res.render('products/foot');
    },

    home: (req, res) => {
        return res.render('users/home');
    },

    metaverso: (req,res) => {
        return res.render('products/metaverso');
    },

    mineria: (req, res) => {
        return res.render('products/mineria');
    },

    monitores: (req,res) => {
        return res.render('products/monitores');
    },

    productDetail: (req,res) => {
        return res.render('prod');
    }, 
}

module.exports = controllers;

