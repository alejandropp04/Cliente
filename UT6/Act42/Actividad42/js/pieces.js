// pieces.js
// Lógica para manipular las piezas en el tablero.

import { FILES, resaltarCasilla } from './board.js';

// Coloca un símbolo en una casilla específica
export function colocarPieza(board, pos, sym) {
    const square = board.querySelector(`.square[data-id="${pos}"]`);
    square ? square.textContent = sym : console.warn(`Casilla ${pos} inválida.`);
}

// Inicializa los peones blancos en la fila 2
export function colocarFilaPeones(board) {
    FILES.forEach(file => {
        colocarPieza(board, `${file}2`, '♙');
    });
}

// Mueve el contenido de una casilla a otra y limpia la selección
export function moverPieza(board, from, to) {
    const src = board.querySelector(`.square[data-id="${from}"]`);
    const dst = board.querySelector(`.square[data-id="${to}"]`);

    if (src && dst && src.textContent) {
        dst.textContent = src.textContent;
        src.textContent = '';
        resaltarCasilla(board, null);
    }
}