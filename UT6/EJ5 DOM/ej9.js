const root = ReactDOM.createRoot(
    document.getElementById("root")
);

const e = React.createElement;
const {useState} = React;

function Peon(){
    const [posicion, setPosicion] = useState(2);

    return e(
        "div", null,
        e(
            "div",
            {
                className: "square",
                onClick: () => setPosicion(posicion +1)
            },
            "♙"
        ),
        e(
            "p", null, "Peon en la fila: " + posicion,
        ),
    )
}

root.render(e(Peon))