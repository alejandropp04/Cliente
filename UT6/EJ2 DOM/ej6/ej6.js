//Creacion del tablero del ej4
function createBoard(){
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let y = 7; y>=0; y--){
        for (let x=0; x<8; x++){

            const celda = document.createElement('div');
            celda.classList.add('square');

            //alternar colores blancos y negros
            const isDark = (x+y) % 2 === 0;
            celda.classList.add(isDark ? 'dark' : 'light');

            //data-pos (ej: a1, h8)
            const pos = `${letters[x]}${y+1}`;
            celda.setAttribute('data-pos', pos);

            board.appendChild(celda);
        }
    }
}

//Creamos el estado con la posicion de los peones
const gameState = {
    pieces: []
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let i = 0; i < 8; i++) {
    gameState.pieces.push({
        type: 'pawn',
        pos: `${letters[i]}2`,
    });
}

//Funcion para crear los peones
function renderPieces(state){
    //limpiar todas las celdas
    const celdas = document.querySelectorAll('.square');
    celdas.forEach(celda => celda.textContent = '');
    celdas.forEach(celda => celda.classList.remove('highlight'));

    //pintar piezas segun el estado
    for(const piece of state.pieces){
        const celda = document.querySelector(
            `.square[data-pos='${piece.pos}']`
        );

        if(!celda) continue;

        if(piece.type === 'pawn'){
            celda.textContent = "♙";
        }
    }
}

//Variables para el control
let selectedPiece = null;
let highlightedCells = [];

//Limpiar highlights
function clearHighlights() {
    highlightedCells.forEach(cell => cell.classList.remove('highlight'));
    highlightedCells = [];
}

//Calcular posibles movimientos del peon (solo hacia adelante)
function getPawnMoves(pos) {
    const file = pos[0];
    const rank = parseInt(pos[1]);
    const moves = [];

    //una casilla hacia delante
    moves.push(`${file}${rank + 1}`);

    //dos casillas desde fila inicial
    if (rank === 2) {
        moves.push(`${file}${rank + 2}`);
    }

    return moves;
}

//Delegacion de eventos en el tablero
const board = document.getElementById('board');

board.addEventListener('click', (e) => {
    const cell = e.target;
    if (!cell.classList.contains('square')) return;
    const pos = cell.dataset.pos;

    // Si hay un peon seleccionado y clicas una celda highlight → mover
    if (selectedPiece && cell.classList.contains('highlight')) {
        selectedPiece.pos = pos;
        selectedPiece = null;
        clearHighlights();
        renderPieces(gameState);
        return;
    }

    // Buscar si hay un peon en la celda
    const piece = gameState.pieces.find(p => p.pos === pos);

    clearHighlights();

    if (!piece) {
        selectedPiece = null;
        return;
    }

    // Seleccionar peon y resaltar posibles movimientos
    selectedPiece = piece;
    const moves = getPawnMoves(piece.pos);

    moves.forEach(move => {
        const targetCell = document.querySelector(`.square[data-pos="${move}"]`);
        if (targetCell) {
            targetCell.classList.add('highlight');
            highlightedCells.push(targetCell);
        }
    });
});

//Llamada a las funciones
createBoard();
renderPieces(gameState);
