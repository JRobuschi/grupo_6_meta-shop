const fs = require ('fs');
const path = require ('path');

//Ubicación del archivo JSON
const filePath = path.resolve(__dirname,'../data/products.json');

//Lectura del archivo JSON y parseado a array
const productsArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));


const controllers = {
    index: (req,res) => {
        res.render('products/productDetail');
    },

    detail: (req, res) => {
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        const discounted = Math.round(product.price - (product.price * product.dicount) / 100)

        return res.render ('detail', {product, discounted})
        //return res.render ('detail', {product})
    },

    create: (req, res) => {
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        const discounted = Math.round(product.pdtPrice - (product.pdtPrice * product.discount) / 100)
        
        return res.render('products/newProducts', {product, discounted})
        //return res.render('products/newProducts', {product})
    },
    store: (req, res) => {
      
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
       

       fs.writeFileSync(filePath, JSON.stringify(productsArray, null, 2))
       return res.send(productsArray);//saco el return de esta linea y pongo en 63
       //<!--Inserto el nuevo producto al array de productos existentes
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
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        
        return res.render ('productDetail/:id/edit/', {product})
    },
    
    update: (req, res) => {
        const idToFind = req.params.id
        const productIndex = products.findIndex(product => product.id == idToFind)
        const editedProduct = req.body;

        productsArray[productIndex].pdtName = editedProduct.pdtName;
        productsArray[productIndex].pdtDescription = editedProduct.pdtDescription;
        productsArray[productIndex].pdtPrice = Number(editedProduct).pdtPrice;
        if (req.body.pdtCategori == ''){
            productsArray[productIndex].pdtCategori = products[productIndex].pdtCategori;
        }else{
            productsArray[productIndex].pdtCategori = editedProduct.pdtCategori
        }
        productsArray[productIndex].pdtDescription = editedProduct.pdtDescription
        if(req.file) {
            productsArray[productIndex].pdtImg = req.file.filename;
        }
        controller.dbReWrite()

        return res.redirect('/products')


        return res.render('/products/editProducts'); //'products/editProducts/' + productId
    },
    destroy: (req, res) => {
        const productId = req.params.id
        return res.render('vamos a borrar un producto' + productId);
    },

    dbReWrite() { 
		fs.writeFileSync(productsFilePath, JSON.stringify(productsArray, null, 2))
	},
	createNewProduct: function (newProduct,newProductImage) {

		newProduct.id = controller.asignIdToProduct();
		newProduct.pdtPrice = Number(newProduct.pdtPrice);
		newProduct.image = newProductImage.filename;
		
		if (newProduct.discount == '') {
			newProduct.discount = 0
		} else {
			newProduct.discount = Number(newProduct.discount)
		}
	},
	asignIdToProduct: function () {
		return productsArray[productsArray.length -1].id +1;
	}
};

module.exports = controllers;