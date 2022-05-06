window.addEventListener("load", function(){
    let formulario = this.document.querySelector("form.productCreate");

    formulario.addEventListener("submit", function(e){
        e.preventDefault();

        let campoNombre = document.querySelector("input.form-input-name")

        if(campoNombre.value == ""){
            alert('El campo de nombre tiene que estar completo');
        } else if (campoNombre.value.length < 3) {
            alert('El campo de nombre debe tener al menos 3 caracteres')
        }

        let campoPrice = document.querySelector("input.form-input-price")

        if(campoPrice.value == ""){
            alert('El campo del precio tiene que estar completo');
        }

        let campoPrice = document.querySelector("input.form-input-price")

        if(campoPrice.value == ""){
            alert('El campo del precio tiene que estar completo');

            let campoPrice = document.querySelector("input.form-input-price")
        }    

        if(campoPrice.value == ""){
            alert('El campo del precio tiene que estar completo');    
        }    
    });

})