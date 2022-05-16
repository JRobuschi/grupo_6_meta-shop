const express = require("express");
const router = express.Router();
const upload = require ("../middlewares/multer");
const authMiddleware = require("../middlewares/authMiddleware");

//Sequelize
// const db = require ('../db/models');

// const ModeloProduct = db.Product;

// router.get('/', async (req, res, next) => {
//    const producto = await ModeloProduct.findAll();
//    return res.send(producto);
// })


//CONTROLADOR//
const productsController = require('../controllers/productControllers');

//TODOS LOS PRODUCTOS//
router.get('/', productsController.index);

//CREATE//
router.get('/create', authMiddleware, productsController.create);
router.post('/', upload.single('image'), productsController.store);

//DELETE//
router.post('/delete/:id', productsController.destroy);

//EDIT//
router.get('/edit/:id', productsController.edit);
router.put('/:id', upload.single('image'), productsController.update);

//GET// 
router.get('/:id/', productsController.detail);
module.exports = router;
