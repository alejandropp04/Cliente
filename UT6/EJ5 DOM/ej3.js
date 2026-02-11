const root = ReactDOM.createRoot(
    document.getElementById("root")
);

const e = React.createElement;

function Titulo(){
    return e(
        "h1",
        null,
        "Contador de clicks"
    );
}

// Estado
const { useState } = React;

//Componente contador de clicks
function ContadorClicks(){
    const [count, setCount] = useState(0);

    //Agregamos un mensaje para mostrarlo en el componente en caso de que se cumpla la condicion
    let mensaje = null

    // Condicion si es mayor a 5 clics
    if (count >= 5){
        mensaje = e(
            "p", null, "¡Te gusta hacer clics!"
        )
    }

    // Devuelve el contador y la condicion
    return e(
        "div", null, e(
            "button",
            {onClick: () => setCount(count + 1)},
            "Clicks: " + count,
        ),
        mensaje //mensaje si se cumple la condicion
    )
}

function App(){
    return e(
        "div",
        null,
        e(Titulo),
        e(ContadorClicks)
    );
}

root.render(e(App))