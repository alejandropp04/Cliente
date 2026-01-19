export function renderPieces(state) {
    document.querySelectorAll('.square').forEach(celda => {
        celda.textContent = '';
        celda.classList.remove('highlight');
    });


    for (const piece of state.pieces) {
        const celda = document.querySelector(`.square[data-pos='${piece.pos}']`);

        if (celda && piece.type === 'pawn') {
            celda.textContent = "♙";
        }
    }
}