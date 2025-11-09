import {moverPieza} from "./movimientos.js";
import {registrarJugada, mostrarHistorial} from "./historial.js";

//Simular algunos movimientos
const jugada1 = moverPieza("e3", "d3");
registrarJugada(jugada1);

const jugada2 = moverPieza("a3", "c5");
registrarJugada(jugada2);

mostrarHistorial();