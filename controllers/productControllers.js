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
      
        const productToCreate = req.body;
        
        productToCreate.pdtPrice = Number(productToCreate.pdtPrice);
        productToCreate.image = req.file.filename;
        if (productToCreate.discount == '') {
            productToCreate.discount = 0;

        }else{
            productToCreate.discount= Number(productToCreate.discount);
        }
        productToCreate.id = productsArray.length +1;

        productsArray.push(productToCreate);
       //console.log(req.body);

       fs.writeFileSync(filePath, JSON.stringify(productsArray, null, 2))
        return res.send(productsArray)
       //Inserto el nuevo producto al array de productos existentes
        productsArray.push({
        pdtName: req.body.pdtName,
        pdtDescription: req.body.pdtDescription,
        pdtCategori: req.body.pdtCategori,
        pdtPrice: req.body.pdtPrice,
        pdtImg: req.body.pdtImg,        
        })
//DEJO EL VIDEO DE MULTER EN 2:06 HORAS POR QUE TODO LO QUE LE PONGO DESPUES DE ROMPE
        //Sobreescribo todo el archivo JSON con el nuevo producto
        fs.writeFileSync(filePath, JSON.stringify(productsArray, null, ' '));

        // y luego la redirección 
        res.redirect('/productDetail?saved=true');
    },
    edit: (req, res) => {
        return res.render('/products/editarProducts')
    },

    /*read: (req, res) => {
        const productId = req.params.id
        return res.render('products/' + productId);
    },*/

    
    update: (req, res) => {
        const idToFind = req.params.id
        const productIndex = products.findIndex(product => product.id == idToFind)
        const editedProduct = req.body;

        products[productIndex].pdtName = editedProduct.pdtName;
        products[productIndex].pdtDescription = editedProduct.pdtDescription;
        products[productIndex].pdtPrice = Number(editedProduct).pdtPrice;
        if (req.body.pdtCategori == ''){
            products[productIndex].pdtCategori = products[productIndex].pdtCategori;
        }else{
            products[productIndex].pdtCategori = editedProduct.pdtCategori
        }
        products[productIndex].pdtDescription = editedProduct.pdtDescription
        if(req.file) {
            products[productIndex].pdtImg = req.file.filename;
        }
        controller.dbReWrite()

        return res.redirect('/products')


        return res.render('/products/editProducts'); //'products/editProducts/' + productId
    },
    delete: (req, res) => {
        const productId = req.params.id
        return res.render('vamos a borrar un producto' + productId);
    }
}

module.exports = controllers;