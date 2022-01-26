const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.listen(3080, () => {
    console.log("Servidor corriendo en el puerto 3080")
});

app.get('/index', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
})
app.get('/productDetail', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productdescription.html'));
})
app.get('/cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/cart.html'));
})
app.get('/register', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
})
app.get('/sesion', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/iniciar-sesion.html'));
})
