const gameState = {
    pawns: ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"]
}

const board = document.getElementById('board');

function renderPawns(state){
    board.textContent = '';

    for (const pawn of state.pawns){
        const piece = document.createElement("span");
        piece.textContent = pawn;
        piece.style.margin = '5px';
        board.appendChild(piece);
    }
}
/*function renderPawns(state) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    for (let i = 0; i < state.pawns.length; i++) {
        const pawnElement = document.createElement('div');
        pawnElement.className = 'pawn';
        pawnElement.textContent = state.pawns[i];
        board.appendChild(pawnElement);
    }
}*/

renderPawns(gameState);