import { generarTablero, inyectarEstilos, resaltarCasilla, resaltarDestino, limpiarDestinos } from './board.js';
import { colocarFilaPeones, moverPieza } from './pieces.js';
import { esMovimientoValido, obtenerDestinosValidos } from './movements.js';

let origenId = null;

document.addEventListener('DOMContentLoaded', () => {
    const board = document.querySelector('.board');

    inyectarEstilos();
    generarTablero(board);
    colocarFilaPeones(board);

    board.addEventListener('click', (e) => {
        const square = e.target.closest('.square');
        if (!square) return;

        const { id } = square.dataset;
        const tienePieza = square.textContent !== '';

        // SELECCIÓN DE PIEZA
        if (tienePieza) {
            origenId = id;
            resaltarCasilla(board, id);
            limpiarDestinos(board);

            const pieza = square.textContent;
            const destinos = obtenerDestinosValidos(id, pieza);
            destinos.forEach(d => resaltarDestino(board, d));
            return;
        }

        // MOVIMIENTO
        if (!tienePieza && origenId) {
            const origen = board.querySelector(`.square[data-id="${origenId}"]`);
            const pieza = origen.textContent;

            if (esMovimientoValido(origenId, id, pieza)) {
                moverPieza(board, origenId, id);

                // animación
                const destino = board.querySelector(`.square[data-id="${id}"]`);
                destino.classList.add('move-anim');
                setTimeout(() => destino.classList.remove('move-anim'), 250);

                limpiarDestinos(board);
                origenId = null;
            }
        }
    });
});
