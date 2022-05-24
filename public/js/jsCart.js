let productsInCart = [];
const parentElement = document.querySelector('#buyItems');
const cartSumPrice = document.querySelector('#cartSumPrice');
const products = document.querySelectorAll('.product-under');

const countTheSumPrice = function(){
    let sumPrice =0;
    productsInCart.forEach( product => {
        sumPrice += product.price;
    });
    return sumPrice;
};


const updateShoppingCartHTML = function(){
    if(productsInCart.length > 0){
        let result = productsInCart.map(product => {
          return `<div class="card1">
          <img src="${product.image}" alt="Denim Jeans" style="width:100%">
          <h3>${product.name}</h3>
          <h4${product.price}"</h4>
          <button class="buttonMinus" dataId='${product.id}>-</button>
                            <span class="count" value="${product.count}>1</span>>
                            <button class="buttonPlus" dataId='${product.id}>+</button>
          
        </div>`;
    });
    parentElement.innerHTML = result.join('');
    document.querySelector('.checkout').classList.add('hidden');
    cartSumPrice.innerHTML = "$" + countTheSumPrice();

    }
    else{
        document.querySelector('.checkout').classList.add('hidden');
        parentElement.innerHTML = '<h4 class="empty">El carrito de compras esta vacio"</h4>';
        cartSumPrice.innerHTML = '';
    }
}


function updateProductsInCart(product){
    for(let i = 0; i < productsInCart.length; i++){
        if(productsInCart[i].id == product.id){
            productsInCart[i].count+=1;
            productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
            return;
        }
    }
    productsInCart.push(product);
}




products.forEach(product => {
    product.addEventListener('click', (e) => {
      if(e.target.classList.contains('addToCart')) {
          const productId = e.target.dataset.productId;
          const productName = product.querySelector('.productName').innerHTML;  
          const productPrice = product.querySelector('.price').innerHTML;  
          const productImage = product.querySelector('.img').src;  
        let productInCart = {
            name: productName,
            image: productImage,
            price: +productPrice,
            id: productId,
            count: 1,
            basePrice: +productPrice
        }
        updateProductsInCart(productInCart);
        updateShoppingCartHTML();
      }
    });
});

    
    parentElement.addEventListener('click', (e) => {
        const isPlusButton = e.target.classList.contains('buttonPlus');
        const isMinusButton = e.target.classList.contains('buttonMinus');
        if(isPlusButton || isMinusButton){
            for(let i=0; i < productsInCart.length; i++){
                if(productsInCart[i].id == e.target.dataset.id){
                    if(isPlusButton){
                        productsInCart[i].count+=1;
                    }
                    else if(isMinusButton){
                        productsInCart[i].count-=1;

                    }
                    productsInCart[i].price = productsInCart[i].basePrice * productsInCart[i].count;
                }
                if(productsInCart[i].count <= 0){
                    productsInCart.splice(i, 1);
                }
            }
            updateShoppingCartHTML();
            }
    });