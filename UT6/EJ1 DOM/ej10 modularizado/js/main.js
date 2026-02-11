import {createBoard} from "./board.js";
import {placeInitialPawn} from "./board.js";
import {enablePawnMove} from "./moves.js";

document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    createBoard(board);      // genera el tablero
    placeInitialPawn();      // coloca el peón en e2
    enablePawnMove();        // activa el movimiento
});
