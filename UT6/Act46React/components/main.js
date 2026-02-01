// Estado principal del juego:
// piezas: posiciones de las piezas en el tablero
// selected: casilla seleccionada
// moves: destinos legales de la pieza seleccionada
// turno: controla qué color puede mover

import crearTablero from "./board.js";
import { generarPiezas } from "./piezas.js";
import { movimientosPeon } from "./moves.js";

const root = ReactDOM.createRoot(
    document.getElementById("root")
);

const e = React.createElement;
const { useState } = React;

function colorPeon(pieza) {
    if (pieza === "♙") return "blanca";
    if (pieza === "♟") return "negra";
    return null;
}

function coronar(pieza, destino) {
    const fila = parseInt(destino[1], 10);

    if (pieza === "♙" && fila === 8) return "♕";
    if (pieza === "♟" && fila === 1) return "♛";
    return pieza;
}

function App() {
    const [piezas, setPiezas] = useState(generarPiezas());
    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState([]);
    const [turno, setTurno] = useState("blanca");

    function limpiarSeleccion() {
        setSelected(null);
        setMoves([]);
    }

    function mover(origen, destino) {
        setPiezas(prev => {
            const nuevo = { ...prev };
            const pieza = nuevo[origen];
            if (!pieza) return prev;

            delete nuevo[origen];
            nuevo[destino] = coronar(pieza, destino);
            return nuevo;
        });

        limpiarSeleccion();
        setTurno(turno === "blanca" ? "negra" : "blanca");
    }

    function onSquareClick(pos) {
        // 1) Si ya hay selección y click en un destino válido -> mover
        if (selected && moves.includes(pos)) {
            mover(selected, pos);
            return;
        }

        // 2) Si click en una pieza -> solo seleccionar si es tu turno
        if (piezas[pos]) {
            if (colorPeon(piezas[pos]) !== turno) return;

            setSelected(pos);
            setMoves(movimientosPeon(pos, piezas));
            return;
        }

        // 3) Click en vacío sin ser destino válido -> limpiar
        limpiarSeleccion();
    }

    return e(
        "div",
        null,
        e("p", null, "Turno: " + turno),
        e(crearTablero, { piezas, selected, moves, onSquareClick })
    );
}

root.render(e(App));
