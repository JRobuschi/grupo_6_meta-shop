const fs = require ('fs');
const path = require ('path');

//Ubicación del archivo JSON
const filePath = path.join(__dirname,'../data/products.json');

//Lectura del archivo JSON y parseado a array
const productsArray = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//lista de productos
const controllers = {
    index: (req,res) => {
        res.render('products', {productsArray})
    },

    detail: (req, res) => {
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        const discounted = Math.round(product.ptdPrice - (product.ptdPrice * product.dicount) / 100)

        return res.render ('products/detalleProducto', {product, discounted})
        //return res.render ('detail', {product})
    },

    create: (req, res) => {
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        
        return res.render('products/newProducts', {product})
        //return res.render('products/newProducts', {product})
    },
    store: (req, res) => {
        const newProduct =  req.body;
		const newProductImage = req.file;
	
		if (req.file && newProductImage.size < 3145728) {
			
		controller.createNewProduct(newProduct,newProductImage)	
		
		products.push (newProduct)

		controller.dbReWrite()

		res.redirect ('/products')

	} else if (req.file && newProductImage.size > 3145729) {
		res.send('El archivo es demasiado pesado')
	} else {
		res.send ('No adjuntaste ninguna imagen')
	}
    },
    edit: (req, res) => {
        const idToFind = req.params.id
        const product = productsArray.find (p => p.id == idToFind)
        
        return res.render ('products/editProducts', {product})
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


       // return res.render('/products/editProducts'); //'products/editProducts/' + productId
    },
    destroy: (req, res) => {
    
        const productId = req.params.id
        const deletedProducts = productsArray.filter (p => p.id != idToFind)

        fs.writeFileSync(filePath, JSON.stringify(deletedProducts, null, 2))
        return res.render('vamos a borrar un producto' + productId);
    },

    dbReWrite() { 
		fs.writeFileSync(filePath, JSON.stringify(productsArray, null, 2))
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