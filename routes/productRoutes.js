const express = require("express");
const router = express.Router();
const productControllers = require("../controllers/productControllers");
const path = require("path");//para cargar multer

const multer = require('multer')
//configurar la logica para almacenar archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('public/images/products')); //resolver desde ruta base esta carpeta
    },
    filename: function (req, file, cb) {//nombre del archivo
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
  });
  //intancia de logica donde se almacena
  const upload = multer({ storage: storage })



router.get("/", productControllers.index);

//router.get("/:id", productControllers.read);

router.get("/crear", productControllers.create);
router.post('/', upload.single('image'), productControllers.store)

router.get('/:id/', productControllers.detail);

router.get("/:id/edit", productControllers.edit); //esta ruta nos lleva hacia el formulario de modificar, es solo una vista
router.put('/:id',upload.single('image'), productControllers.update);//esta ruta tiene que llevarnos hacia la modificacion del elemento

router.delete('/:id', productControllers.destroy)

module.exports = router;