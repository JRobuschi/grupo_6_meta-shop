const bcryptjs = require ('bcryptjs');

console.log(bcryptjs.hashSync('hola123', 10)); //encripta y el 10 es la dificultad de encriptado

//console.log(bcryptjs.compareSync('hola123', 10));  no se para q es