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



router.get("/", productControllers.browse);

//router.get("/:id", productControllers.read);

router.get("/crear", productControllers.create);
router.post('/', upload.single('image'), productControllers.add)

router.get("/editar/:id", productControllers.edit);



router.put('/:id', productControllers.update)

router.delete('/:id', productControllers.delete)

module.exports = router;