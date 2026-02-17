//Solo se cargan los movimientos si el usuario lo pide. No cargues datos al inicio.
//Añadir un boton "Cargar movimientos". Al pulsarlo fetch, muestra los movimientos y deshabilita el boton.
const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;
const { useState } = React;

function App() {
  const [movimientos, setMovimientos] = useState([]);
  const [cargado, setCargado] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function cargarMovimientos() {
    try {
        setError("");
        setLoading(true);

        //Simular el retardo de 2 segundos
        await new Promise(resolve => setTimeout(resolve, 2000));

        const response = await fetch("movimientos.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovimientos(data.movimientos);
        setCargado(true);
    } catch (err) {
        setError(`Error al cargar movimientos: ${err.message}`);
    } finally {
        setLoading(false);
    }
  }

    return e('div', null,
        e('h1', null, 'Movimientos de Ajedrez'),
        error && e('p', { style: { color: 'red' } }, error),
        loading ? e('p', null, 'Cargando movimientos...') :
        e('button', { onClick: cargarMovimientos, disabled: cargado || loading},
            cargado ? 'Movimientos cargados' : "Cargar movimientos"),
        e('ul', null,
            movimientos.map((movimiento, index) =>
                e('li', { key: index }, `${movimiento.pieza}: ${movimiento.from} -> ${movimiento.to}`)
            )
        )
    );
}

root.render(e(App));