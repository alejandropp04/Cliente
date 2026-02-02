import crearTablero from "./board.js";
import { generarPiezas } from "./piezas.js";
import { movimientosPeon, movimientosTorre, movimientosRey } from "./moves.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
const e = React.createElement;
const { useState } = React;

function colorPieza(pieza){
    if(pieza === "♙" || pieza === "♖" || pieza === "♕" || pieza === "♔") return "blanca";
    if(pieza === "♟" || pieza === "♜" || pieza === "♛" || pieza === "♚") return "negra";
    return null;
}

function esPeon(p){ return p === "♙" || p === "♟"; }
function esTorre(p){ return p === "♖" || p === "♜"; }
function esRey(p){ return p === "♔" || p === "♚"; }

function coronar(pieza, destino){
    const fila = parseInt(destino[1], 10);
    if(pieza === "♙" && fila === 8) return "♕";
    if(pieza === "♟" && fila === 1) return "♛";
    return pieza;
}

function App(){
    // piezas en el tablero
    const [piezas, setPiezas] = useState(generarPiezas());

    // selección y movimientos resaltados
    const [selected, setSelected] = useState(null);
    const [moves, setMoves] = useState([]);

    // turno
    const [turno, setTurno] = useState("blanca");

    // flags para enroque: "no se han movido"
    const [castleFlags, setCastleFlags] = useState({
        wK: false, bK: false,   // rey blanco/negro movido?
        wRa: false, wRh: false, // torres blancas (a1/h1) movidas?
        bRa: false, bRh: false, // torres negras (a8/h8) movidas?
    });

    // enPassant: null o { square, pawnPos, capturableBy }
    const [enPassant, setEnPassant] = useState(null);

    function limpiarSeleccion(){
        setSelected(null);
        setMoves([]);
    }

    function toggleTurno(){
        setTurno(t => (t === "blanca" ? "negra" : "blanca"));
    }

    // Actualiza flags de enroque cuando se mueve rey/torre desde sus casillas iniciales
    function actualizarCastleFlags(origen, pieza){
        setCastleFlags(prev => {
            const next = { ...prev };

            if (pieza === "♔") next.wK = true;
            if (pieza === "♚") next.bK = true;

            if (pieza === "♖" && origen === "a1") next.wRa = true;
            if (pieza === "♖" && origen === "h1") next.wRh = true;

            if (pieza === "♜" && origen === "a8") next.bRa = true;
            if (pieza === "♜" && origen === "h8") next.bRh = true;

            return next;
        });
    }

    function esMovimientoEnroque(pieza, origen, destino){
        if (!esRey(pieza)) return false;
        if (pieza === "♔" && origen === "e1" && (destino === "g1" || destino === "c1")) return true;
        if (pieza === "♚" && origen === "e8" && (destino === "g8" || destino === "c8")) return true;
        return false;
    }

    function ejecutarEnroque(pieza, destino, nuevo){
        // nuevo es el objeto ya copiado de piezas
        if (pieza === "♔" && destino === "g1") {
            // rey e1->g1, torre h1->f1
            delete nuevo["e1"];
            delete nuevo["h1"];
            nuevo["g1"] = "♔";
            nuevo["f1"] = "♖";
        }
        if (pieza === "♔" && destino === "c1") {
            // rey e1->c1, torre a1->d1
            delete nuevo["e1"];
            delete nuevo["a1"];
            nuevo["c1"] = "♔";
            nuevo["d1"] = "♖";
        }
        if (pieza === "♚" && destino === "g8") {
            delete nuevo["e8"];
            delete nuevo["h8"];
            nuevo["g8"] = "♚";
            nuevo["f8"] = "♜";
        }
        if (pieza === "♚" && destino === "c8") {
            delete nuevo["e8"];
            delete nuevo["a8"];
            nuevo["c8"] = "♚";
            nuevo["d8"] = "♜";
        }
    }

    function mover(origen, destino){
        setPiezas(prev => {
            const nuevo = { ...prev };
            const pieza = nuevo[origen];
            if (!pieza) return prev;

            // ---- Enroque ----
            if (esMovimientoEnroque(pieza, origen, destino)) {
                ejecutarEnroque(pieza, destino, nuevo);

                // marcar rey y la torre correspondiente como “movidos”
                actualizarCastleFlags("e1", "♔");
                actualizarCastleFlags("e8", "♚");
                if (destino === "g1") actualizarCastleFlags("h1", "♖");
                if (destino === "c1") actualizarCastleFlags("a1", "♖");
                if (destino === "g8") actualizarCastleFlags("h8", "♜");
                if (destino === "c8") actualizarCastleFlags("a8", "♜");

                return nuevo;
            }

            // ---- En passant: si el destino es la casilla enPassant.square ----
            const piezaColor = colorPieza(pieza);
            if (esPeon(pieza) && enPassant && enPassant.square === destino && enPassant.capturableBy === piezaColor) {
                // eliminar el peón capturado “al paso”
                if (enPassant.pawnPos) delete nuevo[enPassant.pawnPos];
            }

            // Movimiento normal/captura normal:
            delete nuevo[origen];
            nuevo[destino] = coronar(pieza, destino);

            return nuevo;
        });

        // Actualizar flags si se movió rey/torre desde inicial
        const piezaMovida = piezas[origen];
        if (piezaMovida) actualizarCastleFlags(origen, piezaMovida);

        // Actualizar enPassant:
        // - si un peón avanza 2, habilita enPassant para el rival
        // - en cualquier otro caso, se borra
        setEnPassant(prevEP => {
            const pieza = piezas[origen];
            if (!esPeon(pieza)) return null;

            const oFila = parseInt(origen[1], 10);
            const dFila = parseInt(destino[1], 10);
            const diff = dFila - oFila;

            // blanco: +2 ; negro: -2
            if (diff === 2 && pieza === "♙") {
                const square = `${origen[0]}${oFila + 1}`; // casilla “pasada”
                return { square, pawnPos: destino, capturableBy: "negra" };
            }
            if (diff === -2 && pieza === "♟") {
                const square = `${origen[0]}${oFila - 1}`;
                return { square, pawnPos: destino, capturableBy: "blanca" };
            }
            return null;
        });

        limpiarSeleccion();
        toggleTurno();
    }

    function onSquareClick(pos){
        // 1) si hay selección y destino válido -> mover
        if (selected && moves.includes(pos)) {
            mover(selected, pos);
            return;
        }

        // 2) seleccionar pieza si es del turno
        const pieza = piezas[pos];
        if (pieza) {
            if (colorPieza(pieza) !== turno) return;

            setSelected(pos);

            if (esPeon(pieza)) {
                setMoves(movimientosPeon(pos, piezas, enPassant));
            } else if (esTorre(pieza)) {
                setMoves(movimientosTorre(pos, piezas));
            } else if (esRey(pieza)) {
                setMoves(movimientosRey(pos, piezas, castleFlags));
            } else {
                setMoves([]);
            }
            return;
        }

        // 3) click en vacío -> limpiar
        limpiarSeleccion();
    }

    return e(
        "div",
        null,
        e("p", null, "Turno: " + turno),
        e(
            "p",
            null,
            "En passant: " + (enPassant ? `${enPassant.square} (capturableBy: ${enPassant.capturableBy})` : "—")
        ),
        e(crearTablero, { piezas, selected, moves, onSquareClick })
    );
}

root.render(e(App));