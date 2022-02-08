const controllers = {
    cart: (req, res) => {
        return res.render('products/cart');
    },
    productDetail: (req,res) => {
        return res.render('products/productDetail');
    }
    
}

module.exports = controllers;