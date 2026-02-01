const root = ReactDOM.createRoot(
    document.getElementById("root"),
);

const e = React.createElement;
const {useState} = React;

function Titulo(){
    return e(
        "h1",
        null,
        "Renderizado de piezas"
    )
}

function RenderizarPiezas(){
    const [piezas] = useState(["Rey", "Dama", "Torre", "Alfil", "Caballo", "Peón"]);

    return e(
        "ul", null,
        piezas.map((pieza, index) =>
            e("li", {key: index}, pieza)
        )
    );
}

function App(){
    return e(
        "div",
        null,
        e(Titulo),
        e(RenderizarPiezas)
    )
}

root.render(e(App))