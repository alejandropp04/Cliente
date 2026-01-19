const gameState = {
    pawns: ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"]
}

function renderPawns(state) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    for (let i = 0; i < state.pawns.length; i++) {
        const square = document.createElement('div');
        square.className = 'square';

        square.style.display = 'inline-block';
        square.style.margin = '5px';

        if(state.pawns[i]){
            square.textContent = state.pawns[i];
        }
        board.appendChild(square);
    }
}

function moverPawn(fromIndex, toIndex){
    if (toIndex < 0 || toIndex > 7){
        console.log("Movimiento fuera de rango");
        return;
    }

    if(!gameState.pawns[fromIndex]){
        console.log("No hay peon en la posicion de origen");
        return;
    }

    const pawn = gameState.pawns[fromIndex];
    gameState.pawns[fromIndex] = null;
    gameState.pawns[toIndex] = pawn;

    console.log(`Peon movido de ${fromIndex} a ${toIndex}`);
    renderPawns(gameState);
}


moverPawn(0, 6);
moverPawn(1, 9);