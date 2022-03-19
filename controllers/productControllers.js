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
        const productId = req.params.productId;
        const productoEncontrado = productsArray.find(p => p.id == productId)

        res.send(productoEncontrado)
        //aca empieza la locura de que el menu empieze a iterar sobre la informacion que recibe del JSON.parse, abandono aca
       // return res.render('/productDetail')
    },

    /*read: (req, res) => {
        const productId = req.params.id
        return res.render('products/' + productId);
    },*/

    
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
    // Create -  Method to store
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

    delete: (req, res) => {
        const productId = req.params.id
        return res.render('vamos a borrar un producto' + productId);
    }
}

module.exports = controllers;