const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );

app.listen(3080, () => {
    console.log("Servidor corriendo en el puerto 3080")
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productDetail.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/productCart.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/register.html'));
})
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/login.html'));
})
