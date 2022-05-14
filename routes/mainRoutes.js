const express = require("express");
const router = express.Router();
const controllers = require("../controllers/mainControllers");

router.get("/", controllers.home);

//session
router.get('/pruebaSession', function (req, res){
    if (req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas ++;
res.send('session tiene el numero: ' + req.session.numeroVisitas)
});

router.get('/mostrarNumeroSession', function(req, res){
    res.send('session tiene el numero: ' + req.session.numeroVisitas)
})



//Falta completar, PERO SI SE AGREGAN HAY QUE MODIFICAR LAS RUTAS!!!
router.get("/foot", controllers.foot);

router.get("/almacenamiento", controllers.almacenamiento);

router.get("/cart", controllers.cart);

router.get("/metaverso", controllers.metaverso);

router.get("/mineria", controllers.mineria);

router.get("/monitores", controllers.monitores);


module.exports = router;






