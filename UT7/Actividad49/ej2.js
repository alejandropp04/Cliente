//Cargar los movimientos desde el archivo movimientos.json
//Usar fetch y asinc/await
//Guardar los movimientos en un estado (useState)
//Muestra en pantalla la lista de movimientos en un <ul>
//Mientras se cargan los datos, muestra el texto "Cargando movimientos..."

const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;

function App() {
    const [movimientos, setMovimientos] = React.useState([]);
    const [cargando, setCargando] = React.useState(false);
    const [error, setError] = React.useState("");
    const [filtro, setFiltro] = React.useState("");

    React.useEffect(() => {
        async function cargarMovimientos() {
            setError("");
            setCargando(true);

            try {
                const response = await fetch('movimientos.json');
                if(!response.ok) throw new Error('Error al cargar el archivo');
                const data = await response.json();
                setMovimientos(data.movimientos);

            } catch (error) {
                setError("Error al cargar los movimientos.");
            } finally {
                setCargando(false);
            }
        }
        cargarMovimientos();
    }, []);
    if (cargando) {
        return e('div', null, 'Cargando movimientos...');
    }

    if (error) {
        return e('div', { style: { color: 'red' } }, error);
    }

    const movimientosFiltrados = movimientos.filter((movimiento) => {
        if (!filtro.trim()) return true;
        const texto = `${movimiento.pieza} ${movimiento.from} ${movimiento.to}`.toLowerCase();
        return texto.includes(filtro.toLowerCase());
    });

    return e("div", null,
        e("h2", null, "Movimientos de ajedrez"),
        e('input', {
            type: 'text',
            placeholder: 'Filtrar movimientos...'
            ,
            value: filtro,
            onChange: (event) => setFiltro(event.target.value)
        }),
        e('ul', null,
            movimientosFiltrados.map((movimiento, index) =>
                e('li', { key: index }, `${movimiento.pieza}: ${movimiento.from} -> ${movimiento.to}`))
        ),
    );
}

root.render(e(App));