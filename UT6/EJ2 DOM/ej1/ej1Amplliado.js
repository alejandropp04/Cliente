const gameState = {
    pawns: ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"]
}

function renderPawns(state) {
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    let pawnIndex = 0;

    for (let y=0; y<8; y++){
        for (let x=0; x<8; x++){

            const square = document.createElement("div");
            square.classList.add('square');

            const isDark = (x + y) % 2 === 1;
            square.classList.add(isDark ? 'dark' : 'light');

            if(y === 1 && pawnIndex < state.pawns.length){
                square.textContent = state.pawns[pawnIndex];
                pawnIndex++;
            }
            board.appendChild(square);
        }
    }
}

renderPawns(gameState);