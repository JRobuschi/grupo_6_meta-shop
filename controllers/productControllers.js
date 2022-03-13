const fs = require ('fs');
const path = require ('path');

//Ubicación del archivo JSON
const filePath = path.resolve(__dirname,'../data/products.json');

//Lectura del archivo JSON y parseado a array
const productsArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));


const controllers = {
    browse: (req,res) => {
        return res.render('products/productDetail');
    },
    
    create: (req, res) => {
        
        return res.render('products/newProducts');
    },
    add: (req, res) => {
      
        return res.send(req.file);
       console.log(req.body);
       //Inserto el nuevo producto al array de productos existentes
        productsArray.push({
        pdtName: req.body.pdtName,
        pdtDescription: req.body.pdtDescription,
        pdtCategori: req.body.pdtCategori,
        pdtPrice: req.body.pdtPrice,
        pdtImg: req.body.pdtImg,        
        })

        //Sobreescribo todo el archivo JSON con el nuevo producto
        fs.writeFileSync(filePath, JSON.stringify(productsArray, null, ' '));

        // y luego la redirección 
        res.redirect('/productDetail?saved=true');
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