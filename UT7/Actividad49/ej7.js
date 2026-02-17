//Cada vez que se hace un movimiento, se quiere mostrar un mensaje
// Guarda el ultimo movimiento en un estado. Usa useEffect para mostrar un mensaje automatico cuando cambie.
// No llames a la funcion desde el boton directamente
const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;
const { useState, useEffect } = React;

function App() {
    const [ultimoMovimiento, setUltimoMovimiento] = useState(null);
    // Mensaje
    const [mensaje, setMensaje] = useState("Aun no hay ningun movimiento.");


    useEffect(() => {
        if (!ultimoMovimiento) return;
        setMensaje(`Último movimiento: ${ultimoMovimiento.pieza} de ${ultimoMovimiento.from} a ${ultimoMovimiento.to}`);
    }, [ultimoMovimiento]);

    function realizarMovimiento(){
        // Simulamos un movimiento
        const movimiento = {
            pieza: "Rey",
            from: "e1",
            to: "e2"
        };
        setUltimoMovimiento(movimiento);
    }


    return e('div', null,
    e('h1', null, 'Simulador de Movimientos de Ajedrez'),
    e('p', null, mensaje),
    e('button', { onClick: realizarMovimiento }, 'Realizar Movimiento')
    );
}

root.render(e(App));