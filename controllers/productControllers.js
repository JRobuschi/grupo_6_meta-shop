const fs = require ('fs');
const path = require ('path');

const filePath = path.resolve(__dirname,'../data/products.json');
const productsArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));



const controllers = {
    browse: (req,res) => {
        return res.render('products/productDetail');
    },
    
    create: (req, res) => {
        
        return res.render('products/newProducts');
    },
    add: (req, res) => {
       // const pdtName = req.body.pdtName;
       // const pdtDescription = req.body.pdtDescription;
       // const pdtCategori = req.body.pdtCategori;
       // const pdtPrice = req.body.pdtPrice;
       // const pdtImg = req.body.pdtImg;

        productsArray.push({
        pdtName: req.body.pdtName,
        pdtDescription: req.body.pdtDescription,
        pdtCategori: req.body.pdtCategori,
        pdtPrice: req.body.pdtPrice,
        pdtImg: req.body.pdtImg,        
        })

        fs.writeFileSync(filePath, JSON.stringify(productsArray, null, ' '));

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