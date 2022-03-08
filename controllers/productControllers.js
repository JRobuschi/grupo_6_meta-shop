const controllers = {
    productDetail: (req,res) => {
        return res.render('products/productDetail');
    },
    /*mostrarPorId: (req, res) => {
        logica a implementar
    },*/
    crearProducto: (req, res) => {
        
        return res.render('products/newProducts');
    },
    editarProducto: (req, res) => {
        return res.render('products/editProducts');
    } 

}

module.exports = controllers;