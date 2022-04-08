const express = require('express');
const path = require('path');
var session = require('express-session');
const app = express();
const cookieParser = require('cookie-parser');

const homeRoutes = require("./routes/homeRoutes");
const cartRoutes = require("./routes/cartRoutes");
const productRoutes = require ("./routes/productRoutes");
const mineriaRoutes = require ("./routes/mineriaRoutes");
const almaRoutes = require ("./routes/almaRoutes");
const monitoresRoutes = require ("./routes/monitoresRoutes");
const metaRoutes = require ("./routes/metaRoutes");
const footRoutes = require ("./routes/footRoutes");
const userRoutes = require("./routes/users");
//const newProductsRoutes = require ("./routes/newProductsRoutes");
//const editProductsRoutes = require ("./routes/editProductsRoutes");

// method-Override //
const methodOverride = require('method-override');
const exp = require('constants');


// Setup del req.body (deja disponible el contenido de los formularios)
app.use(express.urlencoded({ extended: false })); //session dice q va false, estaba true
app.use(express.json());

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.listen(3080, () => {
    console.log("Servidor Corriendo")
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(session({
    secret: 'secret word!',
    resave: true,
    saveUninitialized: true,
}));

//404//
app.use((req, res, next) => {
    res.status(404).render('404-page');
    next();
});



app.use("/", homeRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);
app.use("/mineria", mineriaRoutes);
app.use("/almacenamiento", almaRoutes);
app.use("/monitores", monitoresRoutes);
app.use("/metaverso", metaRoutes);
app.use("/foot", footRoutes);
app.use("/users", userRoutes);
//app.use("/newProducts", newProductsRoutes);
//app.use("/editProducts", editProductsRoutes);
//midelwere de aplicacion 














