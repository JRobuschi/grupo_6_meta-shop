/*window.addEventListener("click", function() {
    this.alert('cuidado con lo q haces funciona todo perfecto no rompas nada');
     })*/
     
window.addEventListener("load", function(){
   
    let form = document.querySelector("form.productCreate");

    form.addEventListener("submit", function(e){
        

        let errores = [];


        let campoNombre = document.querySelector("input.formName")

        if(campoNombre.value == ""){
            errores.push('El campo de nombre tiene que estar completo');
        } else if (campoNombre.value.length < 5) {
            errores.push('El campo de nombre debe tener al menos 5 caracteres')
        }

        let campoPrice = document.querySelector("input.formPrice")

        if(campoPrice.value == "" ){
            errores.push('El campo del precio tiene que estar completo');
        }else if (campoPrice.value.length < 0){
            errores.push('El campo del precio tiene que ser mayor a cero')
        }

        let campoDescription = document.querySelector("input.formDescription")

        if(campoDescription.value == ""){
            errores.push('El campo de descripción tiene que estar completo');         
        } else if (campoDescription.value.length < 20) {
            errores.push('El campo de descripción debe tener al menos 20 caracteres')
        }   

        if(campoPrice.value == ""){
            errores.push('El campo del precio tiene que estar completo');    
        
        }    

        if (errores.length > 0){
            e.preventDefault();
            
            let ulErrores = document.querySelector("div.errores ul")
            for (let i = 0; i < errores.length; i++) {

                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
                
            }
        }
    });

})