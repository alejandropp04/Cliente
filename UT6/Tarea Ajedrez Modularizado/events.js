import {gameState} from "./state.js";
import {getPawnMoves} from "./moves.js";
import {renderPieces} from "./pieces.js";

let highlightedCells = [];

//Limpiar highlights
function clearHighlights() {
    highlightedCells.forEach(cell => cell.classList.remove('highlight'));
    highlightedCells = [];
}

export function initEvents(){
    const board = document.getElementById('board');

    board.addEventListener('click', (event) => {
        const cell = event.target;
        if (!cell.classList.contains('square')) return;

        const pos = cell.dataset.pos;

        //mover pieza
        if(gameState.selectedPiece && cell.classList.contains('highlight')){
            gameState.selectedPiece.pos = pos;
            gameState.selectedPiece = null;
            clearHighlights();
            renderPieces(gameState);
            return;
        }

        //Seleccionar pieza
        const piece = gameState.pieces.find(p => p.pos === pos);

        clearHighlights();
        if(!piece){
            gameState.selectedPiece = null;
            return;
        }

        gameState.selectedPiece = piece;

        const moves = getPawnMoves(piece.pos);
        moves.forEach(move => {
            const target = document.querySelector(`.square[data-pos='${move}']`);
            if(target){
                target.classList.add('highlight');
                highlightedCells.push(target);
            }
        })
    })
}