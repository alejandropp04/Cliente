const root = ReactDOM.createRoot(
    document.getElementById("root"),
)

const e = React.createElement;
const {useState} = React;

function Titulo(){
    return e(
        "h1",
        null,
        "Registro de movimientos"
    )
}

function generarMovimientoAleatorio(){
    const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numeros = [1,2,3,4,5,6,7,8]

    const letra = letras[Math.floor(Math.random() * letras.length)];
    const numero = numeros[Math.floor(Math.random() * numeros.length)];

    return `${letra}${numero}`;
}

function RegistroMovimientos(){
    const [movimientos, setMovimientos] = useState([]);

    function anyadirMovimiento(){
        const nuevo = generarMovimientoAleatorio();

        setMovimientos(prev => [...prev, nuevo])
    }
    return e(
        "div", null, e(
            "button",
            {onClick: () => anyadirMovimiento()},
            "Añadir movimiento"
        ),
        e(
            "ul", null,
            movimientos.map((movimiento, index) =>
                e("li", {key: index}, movimiento)
            )
        )
    )
}

function App(){
    return e(
        "div",
        null,
        e(Titulo),
        e(RegistroMovimientos)
    )
}

root.render(e(App))