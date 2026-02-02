import { crearTableroDOM } from "./board.js";
import { generarPiezasIniciales } from "./piezas.js";
import { movimientosPeon, movimientosTorre, movimientosRey, colorPieza } from "./moves.js";

// ----------------------------
// Estado global (gameState)
// ----------------------------
const gameState = {
    piezas: generarPiezasIniciales(),
    selected: null,
    moves: [],
    turno: "blanca",

    // Flags para enroque: false = NO se ha movido todavía
    // wK: rey blanco, wRa: torre blanca a1, wRh: torre blanca h1, etc.
    castleFlags: {
        wK: false, bK: false,
        wRa: false, wRh: false,
        bRa: false, bRh: false,
    },
};

// ----------------------------
// Helpers
// ----------------------------
function esPeon(p) { return p === "♙" || p === "♟"; }
function esTorre(p) { return p === "♖" || p === "♜"; }
function esRey(p) { return p === "♔" || p === "♚"; }

function coronar(pieza, destino) {
    const fila = parseInt(destino[1], 10);
    if (pieza === "♙" && fila === 8) return "♕";
    if (pieza === "♟" && fila === 1) return "♛";
    return pieza;
}

function limpiarSeleccion() {
    gameState.selected = null;
    gameState.moves = [];
}

function toggleTurno() {
    gameState.turno = (gameState.turno === "blanca") ? "negra" : "blanca";
}

function actualizarCastleFlags(origen, pieza) {
    // Si el rey se mueve, ya no puede enrocar
    if (pieza === "♔") gameState.castleFlags.wK = true;
    if (pieza === "♚") gameState.castleFlags.bK = true;

    // Si una torre sale de su esquina, ese enroque deja de estar permitido
    if (pieza === "♖" && origen === "a1") gameState.castleFlags.wRa = true;
    if (pieza === "♖" && origen === "h1") gameState.castleFlags.wRh = true;

    if (pieza === "♜" && origen === "a8") gameState.castleFlags.bRa = true;
    if (pieza === "♜" && origen === "h8") gameState.castleFlags.bRh = true;
}

function esEnroque(pieza, origen, destino) {
    return (
        (pieza === "♔" && origen === "e1" && (destino === "g1" || destino === "c1")) ||
        (pieza === "♚" && origen === "e8" && (destino === "g8" || destino === "c8"))
    );
}

function ejecutarEnroque(pieza, destino) {
    const p = gameState.piezas;

    // Blanco corto: e1->g1 y h1->f1
    if (pieza === "♔" && destino === "g1") {
        delete p["e1"]; delete p["h1"];
        p["g1"] = "♔";  p["f1"] = "♖";
        gameState.castleFlags.wK = true;
        gameState.castleFlags.wRh = true;
        return;
    }

    // Blanco largo: e1->c1 y a1->d1
    if (pieza === "♔" && destino === "c1") {
        delete p["e1"]; delete p["a1"];
        p["c1"] = "♔";  p["d1"] = "♖";
        gameState.castleFlags.wK = true;
        gameState.castleFlags.wRa = true;
        return;
    }

    // Negro corto: e8->g8 y h8->f8
    if (pieza === "♚" && destino === "g8") {
        delete p["e8"]; delete p["h8"];
        p["g8"] = "♚";  p["f8"] = "♜";
        gameState.castleFlags.bK = true;
        gameState.castleFlags.bRh = true;
        return;
    }

    // Negro largo: e8->c8 y a8->d8
    if (pieza === "♚" && destino === "c8") {
        delete p["e8"]; delete p["a8"];
        p["c8"] = "♚";  p["d8"] = "♜";
        gameState.castleFlags.bK = true;
        gameState.castleFlags.bRa = true;
        return;
    }
}

// ----------------------------
// Movimiento
// ----------------------------
function mover(origen, destino) {
    const p = gameState.piezas;
    const pieza = p[origen];
    if (!pieza) return;

    // Enroque: mueve rey + torre a la vez
    if (esEnroque(pieza, origen, destino)) {
        ejecutarEnroque(pieza, destino);
        limpiarSeleccion();
        toggleTurno();
        render();
        return;
    }

    // Movimiento normal / captura normal
    delete p[origen];
    p[destino] = coronar(pieza, destino);

    // Flags de enroque si moviste rey/torre desde su casilla inicial
    actualizarCastleFlags(origen, pieza);

    limpiarSeleccion();
    toggleTurno();
    render();
}

// ----------------------------
// Selección y clicks
// ----------------------------
function seleccionar(pos) {
    const pieza = gameState.piezas[pos];
    if (!pieza) return;

    // Respetar turno
    if (colorPieza(pieza) !== gameState.turno) return;

    gameState.selected = pos;

    if (esPeon(pieza)) {
        gameState.moves = movimientosPeon(pos, gameState.piezas);
    } else if (esTorre(pieza)) {
        gameState.moves = movimientosTorre(pos, gameState.piezas);
    } else if (esRey(pieza)) {
        gameState.moves = movimientosRey(pos, gameState.piezas, gameState.castleFlags);
    } else {
        gameState.moves = [];
    }
}

function onSquareClick(pos) {
    // Si hay selección y el click es un destino válido -> mover
    if (gameState.selected && gameState.moves.includes(pos)) {
        mover(gameState.selected, pos);
        return;
    }

    // Si click en pieza -> seleccionar
    if (gameState.piezas[pos]) {
        seleccionar(pos);
        render();
        return;
    }

    // Click en vacío -> limpiar
    limpiarSeleccion();
    render();
}

// ----------------------------
// Render (DOM manual)
// ----------------------------
function render() {
    const app = document.getElementById("app");
    app.innerHTML = "";

    // Info (turno)
    const info = document.createElement("div");
    info.className = "info";
    info.textContent = "Turno: " + gameState.turno;
    app.appendChild(info);

    // Tablero
    const tableroDOM = crearTableroDOM({
        piezas: gameState.piezas,
        selected: gameState.selected,
        moves: gameState.moves,
        onSquareClick,
    });

    app.appendChild(tableroDOM);
}

// Primer render
render();
