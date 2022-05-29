const express = require("express");
const router = express.Router();
const upload = require ("../middlewares/multer");
const authMiddleware = require("../middlewares/authMiddleware");
const userLoggedMiddleware = require('../middlewares/userLoggedMiddleware');
const productsController = require('../controllers/productControllers');
//Sequelize
// const db = require ('../db/models');

// const ModeloProduct = db.Product;

// router.get('/', async (req, res, next) => {
//    const producto = await ModeloProduct.findAll();
//    return res.send(producto);
// })


//TODOS LOS PRODUCTOS//
router.get('/', productsController.index);

//CREATE//
router.get('/create', userLoggedMiddleware, productsController.create);
router.post('/', upload.single('image'), productsController.store);

//DELETE//
router.post('/delete/:id', authMiddleware, productsController.destroy);

//EDIT//
router.get('/edit/:id', authMiddleware, productsController.edit);
router.put('/edit/:id', authMiddleware, upload.single('image'), productsController.update);

//GET// 
router.get('/:id/', productsController.detail);
module.exports = router;
