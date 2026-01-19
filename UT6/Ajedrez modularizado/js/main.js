import { createBoard, boardEl } from './board.js';
import { gameState, toggleTurn, saveHistory } from './gameState.js';
import { initPieces, renderPieces, getPawnMoves } from './pieces.js';
import { updatePanel } from './panel.js';
import { setupControls } from './controls.js';
import { setupForm } from './setupForm.js';

let selectedPiece = null;
let highlightedCells = [];

function clearHighlights(){
    highlightedCells.forEach(c => c.classList.remove('highlight'));
    highlightedCells = [];
}

// Inicializar tablero y juego
createBoard();
gameState.pieces = initPieces();
updatePanel();
renderPieces(gameState);
setupControls();
setupForm();

// Delegación de eventos para mover piezas
boardEl.addEventListener('click', e => {
    const cell = e.target;
    if(!cell.classList.contains('square')) return;
    const pos = cell.dataset.pos;

    if(selectedPiece && cell.classList.contains('highlight')){
        saveHistory();
        selectedPiece.pos = pos;
        selectedPiece = null;
        clearHighlights();
        gameState.moveCount++;
        updatePanel();
        renderPieces(gameState);
        toggleTurn();
        return;
    }

    const piece = gameState.pieces.find(p => p.pos === pos);
    clearHighlights();
    if(!piece){ selectedPiece = null; return; }

    selectedPiece = piece;
    const moves = getPawnMoves(piece.pos);
    moves.forEach(move => {
        const targetCell = document.querySelector(`.square[data-pos="${move}"]`);
        if(targetCell){
            targetCell.classList.add('highlight');
            highlightedCells.push(targetCell);
        }
    });
});
