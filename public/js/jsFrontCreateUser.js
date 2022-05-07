/*window.addEventListener("click", function() {
    this.alert('cuidado con lo q haces funciona todo perfecto no rompas nada');
})*/

window.addEventListener("load", function(){
    let form =    document.querySelector("form.userRegister");

    form.addEventListener("submit", function(e){
        

        let errores = []; 


        let campoNombre = document.querySelector("input.tagNombre")

        if(campoNombre.value == ""){
            errores.push('El campo de nombre tiene que estar completo');
        } else if (campoNombre.value.length < 5) {
            errores.push('El campo de nombre debe tener al menos 5 caracteres')
        }

        let campoApellido = document.querySelector("input.tagApellido")

        if(campoApellido.value == "" ){
            errores.push('El campo del apellido tiene que estar completo');
        }else if (campoApellido.value.length < 5){
            errores.push('El campo del apellido debe tener al menos 5 caracteres')
        }

        let campoEmail = document.querySelector("input.tagEmail")

        if(campoEmail.value == ""){
            errores.push('El campo de email tiene que estar completo');         
        } else if (campoEmail.value.length < 20) {
            errores.push('El campo de descripción debe tener al menos 20 caracteres')
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