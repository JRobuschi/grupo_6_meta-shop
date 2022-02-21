const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.listen(3080, () => {
    console.log("Servidor corriendo en el puerto 3080")
});

/* app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/users/home.ejs'));
})
app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views//products/productdescription.ejs'));
})
app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/products/cart.ejs'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/users/iniciarSesion.ejs'));
})
app.get('/sesion', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/users/iniciarSesion.ejs'));
}) */


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const homeRoutes = require("./routes/homeRoutes");
app.use("/", homeRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/cart", cartRoutes);

const iniciarSesionRoutes = require("./routes/iniciarSesionRoutes");
app.use("/register", iniciarSesionRoutes);

const productRoutes = require ("./routes/productRoutes");
app.use("/productDetail", productRoutes);

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

//404//
app.use((req, res, next) => {
    res.status(404).render('404-page');
    next();
});











