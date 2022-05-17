const ComponenteInicial = () => {
    
    const nombre = "juan";
    
    return (
        <div className="componente">
            
            <h3> Hola {nombre} </h3>

        </div>
    )
}

//Contenedor de la App de React
const containerPrincipal = document.querySelector('#appReact');
const root = ReactDOM.createRoot(containerPrincipal);
root.render(<ComponenteInicial />);