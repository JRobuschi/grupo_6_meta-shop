const controllers = {
    browse: (req,res) => {
        return res.render('products/productDetail');
    },
    
    create: (req, res) => {
        
        return res.render('products/newProducts');
    },
    add: (req, res) => {
        const pdtName = req.body.pdtName;
        const pdtDescription = req.body.pdtDescription;
        const pdtCategori = req.body.pdtCategori;
        const pdtPrice = req.body.pdtPrice;
        const pdtImg = req.body.pdtImg;
        return res.render('vamos a guardar la info del producto'); 
    },
    edit: (req, res) => {
        return res.render('products/editProducts/' + productId);
    },

    /*read: (req, res) => {
        const productId = req.params.id
        return res.render('products/' + productId);
    },*/

    
    update: (req, res) => {
        return res.render("vamos a actualizar un producto" + productId);
    },
    delete: (req, res) => {
        const productId = req.params.id
        return res.render('vamos a borrar un producto' + productId);
    }
}

module.exports = controllers;