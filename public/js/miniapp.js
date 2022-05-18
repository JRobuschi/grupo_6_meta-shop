const ComponenteInicial = () => {
    
    const nombre = "juan";

    const nombre1 = "mategazza"

    const nombre2 = "alfonso"
    
    return (
        <div className="componente">
            
            <h3> Best Friends Forever  {nombre} + {nombre1} + {nombre2}</h3>

        </div>
    )
}

//Contenedor de la App de React
const containerPrincipal = document.querySelector('#appReact');
const root = ReactDOM.createRoot(containerPrincipal);
root.render(<ComponenteInicial />);