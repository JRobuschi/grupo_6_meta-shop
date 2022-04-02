const express = require("express");
const router = express.Router();
const homeControllers = require("../controllers/homeControllers");

router.get("/", homeControllers.home);

//session
router.get('/pruebaSession', function (req, res){
    if (req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas ++;
res.send('session tiene el numero: ' + req.session.numeroVisitas)
});


module.exports = router;