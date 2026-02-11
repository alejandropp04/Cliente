const root = ReactDOM.createRoot(
    document.getElementById("root")
);

const e = React.createElement;
const { useState } = React;

function Titulo(){
    return e(
        "h1",
        null,
        "Selector de colores"
    );
}

function SelectorColor(){
    const [color, setColor] = useState(null)

    let mensaje = null;

    //Condicion si es blancas o negras
    if(color === "blancas"){
        mensaje = e(
            "p", null, "Color seleccionado: Blancas"
        )
    }else if(color === "negras"){
        mensaje = e(
            "p", null, "Color seleccionado: Negras"
        )
    }else{
        mensaje = e(
            "p", null, "Color seleccionado: Ninguno"
        )
    }

    return e(
        "div", null, e(
            "button",
            {onClick: () => setColor("blancas")},
            "Blancas",
        ),
        " ", null, e(
            "button",
            {onClick: () => setColor("negras")},
            "Negras"
        ),
        mensaje
    )
}

function App(){
    return e(
        "div",
        null,
        e(Titulo),
        e(SelectorColor)
    );
}

root.render(e(App));