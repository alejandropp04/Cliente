/*Tienes este formato:
[
 { "from": "e2", "to": "e4", "piece": "pawn" }
]
ENUNCIADO
1. Carga el JSON.
2. Transforma los datos para mostrarlos como:
“Peón de e2 a e4”
3. Muestra la lista transformada.*/
const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;
const { useState} = React;

function App() {
    const [movimientos, setMovimientos] = useState([]);
    const [error, setError] = useState("");

    async function cargarMovimientos() {
        try {
            setError("");
            const response = await fetch("movimientosFrom.json");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const transformados = data.map(movimiento => {
                return `${traducirPieza(movimiento.piece)} de ${movimiento.from} a ${movimiento.to}`;
            });
            setMovimientos(transformados);
        } catch (err) {
            setError(`Error al cargar movimientos: ${err.message}`);
        }
    }

    function traducirPieza(pieza) {
        const traducciones = {
            pawn: "Peón",
            knight: "Caballo",
            bishop: "Alfil",
            rook: "Torre",
            queen: "Reina",
            king: "Rey"
        };
        return traducciones[pieza] || pieza;
    }

    return e('div', null,
        e('h1', null, 'Movimientos de Ajedrez'),
        error && e('p', { style: { color: 'red' } }, error),
        e('button', { onClick: cargarMovimientos }, 'Cargar Movimientos'),
        e('ul', null,
            movimientos.map((movimiento, index) =>
                e('li', { key: index }, movimiento)
            )
        )
    );
}
root.render(e(App))