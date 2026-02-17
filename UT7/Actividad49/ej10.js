//Cargar los movimientos al iniciar. Muestra el historial. Permite ocultralo/mostrarlo con un boton.
// Usa estado y renderizado condicional.

const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;
const { useState, useEffect } = React;

function App() {
    const[movimientos, setMovimientos] = useState([]);
    const[error, setError] = useState("");
    const[mostrar, setMostrar] = useState(true);

    // Cargar movimientos al iniciar
    useEffect(() => {
        cargar();
    } , []);

    // Función para cargar movimientos
    async function cargar() {
        try {
            setError("");
            const response = await fetch('movimientos.json');
            if (!response.ok) throw new Error('Error al cargar el archivo');
            const data = await response.json();
            setMovimientos(data.movimientos);
        } catch (err) {
            setError("Error cargando los datos.");
        }
    }

    // Renderizado condicional para mostrar/ocultar movimientos
    return e('div', null,
        e('h1', null, 'Historial de Movimientos'),
        error && e('p', { style: { color: 'red' } }, error),
        e('button', { onClick: () => setMostrar(!mostrar) }, mostrar ? 'Ocultar Movimientos' : 'Mostrar Movimientos'),
        // Mostrar movimientos solo si mostrar es true
        mostrar && e('ul', null,
            movimientos.map((movimiento, index) =>
                e('li', { key: index }, `${movimiento.pieza}: ${movimiento.from} -> ${movimiento.to}`))
        )
    );
}

root.render(e(App));