// board.js
// Generación y manipulación visual del tablero.

export const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

// Añade estilos CSS dinámicamente para la selección
export function inyectarEstilos() {
    const style = document.createElement('style');
    style.textContent = `
        .selected {
            background-color: #baca44 !important;
            border: 2px solid #ff0;
        }

        .highlight {
            box-shadow: inset 0 0 0 3px #4caf50;
            transition: box-shadow 0.2s ease;
        }

        .move-anim {
            animation: movePiece 0.25s ease;
        }

        @keyframes movePiece {
            from {
                transform: scale(1.15);
            }
            to {
                transform: scale(1);
            }
        }
    `;
    document.head.append(style);
}


// Crea la estructura HTML del tablero 8x8
export function generarTablero(boardElement) {
    if (!boardElement) return console.error('Tablero no encontrado.');

    const fragment = document.createDocumentFragment();

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.classList.add('square');

            const isLight = (row + col) % 2 === 0;
            square.classList.add(isLight ? 'light' : 'dark');

            square.dataset.id = `${FILES[col]}${RANKS[row]}`;
            fragment.append(square);
        }
    }
    boardElement.append(fragment);
}

// Gestiona la clase .selected para resaltar casillas
export function resaltarCasilla(board, id) {
    const prev = board.querySelector('.selected');
    if (prev) prev.classList.remove('selected');

    if (id) {
        const square = board.querySelector(`.square[data-id="${id}"]`);
        if (square) square.classList.add('selected');
    }
}
export function resaltarDestino(board, id) {
    const square = board.querySelector(`.square[data-id="${id}"]`);
    if (square) square.classList.add('highlight');
}

export function limpiarDestinos(board) {
    board.querySelectorAll('.highlight').forEach(sq =>
        sq.classList.remove('highlight')
    );
}
