const express = require('express');
const path = require('path');

const app = express();

// Setup del req.body (deja disponible el contenido de los formularios)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.listen(3080, () => {
    console.log("espere! Servidor jugando al ROBLOX")
});






app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const iniciarSesionRoutes = require("./routes/iniciarSesionRoutes");
app.use("/register", iniciarSesionRoutes);

const productRoutes = require ("./routes/productRoutes");
app.use("/products", productRoutes);

const mineriaRoutes = require ("./routes/mineriaRoutes");
app.use("/mineria", mineriaRoutes);

const almaRoutes = require ("./routes/almaRoutes");
app.use("/almacenamiento", almaRoutes);

const monitoresRoutes = require ("./routes/monitoresRoutes");
app.use("/monitores", monitoresRoutes);

const metaRoutes = require ("./routes/metaRoutes");
app.use("/metaverso", metaRoutes);

const footRoutes = require ("./routes/footRoutes");
app.use("/foot", footRoutes);




//const newProductsRoutes = require ("./routes/newProductsRoutes");
//app.use("/newProducts", newProductsRoutes);

//const editProductsRoutes = require ("./routes/editProductsRoutes");
//rsapp.use("/editProducts", editProductsRoutes);

//404//
app.use((req, res, next) => {
    res.status(404).render('404-page');
    next();
});

// method-Override //
const methodOverride = require ('method-override');
const exp = require('constants');
app.use(methodOverride('_method'));










