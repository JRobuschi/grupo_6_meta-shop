const fs = require ('fs');
const path = require ('path');
const { CLIENT_RENEG_LIMIT } = require('tls');

//Sequalize
const db = require("../db/models");
const sequelize = db.sequelize;

//Ubicación del archivo JSON
const filePath = path.join(__dirname,'../data/products.json');

//Lectura del archivo JSON y parseado a array
//const productsArray = JSON.parse(fs.readFileSync(filePath, 'utf8'))


//lista de productos
const controllers = {
    index: (req,res) => {
        
        db.Product.findAll({
            include:["category"]
        })
        .then(productsArray => res.render('products', {productsArray}))
        .catch(err => {
             res.send(err)
         })
    },

    detail: async (req, res) => {
        console.log("Estoy en detailllllll")
        const idToFind = req.params.id;
        db.Product.findByPk(idToFind)
        .then(function (producto){
            res.render('products/detalleProducto', {producto: producto})
        })
        //const productDetail = await db.Product.findByPk(idToFind);

        //return res.render ('products/detalleProducto', {productDetail})
        //return res.render ('detail', {product})
    },

    
    
    create: async (req, res) => { //es una promesa, es un codigo asincronico
        try {            
            let products = await db.Product.findAll(); //await espera q se complete la promesa
           //then realiza todo al mismo tiempo

            return res.render("products/newProducts", { products });
        }
        catch (error) {
            console.log(error);
        }
    },
    //PARTE A PROBAR
    //create: function(req, res){
        //const datos = req.body;
        //db.product.create(req.body)
           
    //}

    //PARTE VIEJA
    //create: (req, res) => {
    //    const idToFind = req.params.id
    //    const product = productsArray.find (p => p.id == idToFind)
        
    //    return res.render('products/newProducts', {product})
        //return res.render('products/newProducts', {product})

    //    db.Product.create()
    //    .then()
    
    store: async (req, res) => {
        const newProduct =  req.body;
		//const newProductImage = req.file;

        const productCreated = await db.Product.create({
            pdtName: newProduct.pdtName,
            pdtPrice: newProduct.pdtPrice,
            pdtDescription: newProduct.pdtDescription,
            image: "/images/products/" + req.file.filename
        })



		//if (req.file && newProductImage.size < 3145728) {
			
		//controllers.createNewProduct(newProduct,newProductImage)	
		
		//productsArray.push (newProduct)

		//controllers.dbReWrite()

		res.redirect ('/products/' + productCreated.id) 

	}, //else if (req.file && newProductImage.size > 3145729) {
		//res.send('El archivo es demasiado pesado')
	//} else {
		//res.send ('No adjuntaste ninguna imagen')
	//}
    
    edit: async(req, res) => {
        
        console.log(req.params);
        let products = await db.Product.findByPk(req.params.id, {
            include: {
                all: true
            }
        });    
        
        let categories = await db.Category.findAll();

        if (products) {
            
            return res.render('/editProducts', {products: products, categories: categories});
        }
        else {
            res.redirect('/products')
        }
    },    
    
    
    update: async (req, res) => {
        const idToFind = req.params.id
        const productToEdit = await db.Product.findByPk(idToFind);
        const editedProduct = req.body;

        productToEdit.pdtName = editedProduct.pdtName;
        productToEdit.pdtDescription = editedProduct.pdtDescription;
        productToEdit.pdtPrice = Number(editedProduct).pdtPrice;
        //if (req.body.pdtCategori == ''){
         //   productToEdit.pdtCategori = products[productIndex].pdtCategori;
        //}else{
        //   productToEdit.pdtCategori = editedProduct.pdtCategori
        //}
        productToEdit.pdtDescription = editedProduct.pdtDescription
        if(req.file) {
            productToEdit.image = req.file.filename;
        }
        await productToEdit.save();

        return res.redirect('/products')
        //sequalize a ver 2horas 6 minutos manipulacion de datos
        //async function (req, res){
        //const idToFind(producto a editar) = req.params.id;
        //await Product.update(
               // req.body,{
               //    where: {
                //       id: idToFind
                //   }
              // })
             //  return res.send ('producto actualizado')

       // return res.render('/products/editProducts'); //'products/editProducts/' + productId
    },
    

    destroy: async (req, res) => {
        const productToDelete = await db.Product.findByPk(req.params.id, {
            include: { all: true }
        })
        
        productToDelete.removerelCartProductProduct(productToDelete.relCartproductProduct);
        productToDelete.removerelCategoriesProduct(productToDelete.relCategoriesProduct);
        
        
        const result = await productToDelete.destroy();
        return res.redirect("/products");
    },








    //dbReWrite() { 
	//	fs.writeFileSync(filePath, JSON.stringify(productsArray, null, 2))
	//},
	// createNewProduct: function (newProduct,newProductImage) {

	// 	//newProduct.id = controllers.asignIdToProduct();
	// 	newProduct.pdtPrice = Number(newProduct.pdtPrice);
	// 	newProduct.image = newProductImage.filename;
		
	// 	if (newProduct.discount == '') {
	// 		newProduct.discount = 0
	// 	} else {
	// 		newProduct.discount = Number(newProduct.discount)
	// 	}
	// }   
	//asignIdToProduct: function () {
	//	return productsArray[productsArray.length -1].id +1;
	//}
};

module.exports = controllers;