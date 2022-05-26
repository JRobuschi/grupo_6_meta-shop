let contenedorProductos=document.getElementById('contenedorProductos');

let carrito=[];


stockProductos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto'); 
    div.innerHTML=`
    <img src="${producto.img}" alt="">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class fas-fa-shopping-cart"</button>`

    contenedorProductos.appendChild(div);
})

const agregarAlCarrito = (prodId) => {
    const item = stockProductos.find((prod) => prod.id === prodId);
}