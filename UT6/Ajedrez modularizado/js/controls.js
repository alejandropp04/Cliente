import { gameState, toggleTurn, saveHistory } from './gameState.js';
import { renderPieces, initPieces } from './pieces.js';
import { updatePanel } from './panel.js';

export function setupControls() {
    document.getElementById('show-state').addEventListener('click', () => console.log(gameState));
    document.getElementById('undo').addEventListener('click', undoMove);
    document.getElementById('reset').addEventListener('click', resetGame);

    document.addEventListener('keydown', e => {
        if(e.key==='r') resetGame();
        if(e.key==='u') undoMove();
    });

    function undoMove() {
        if(gameState.history.length === 0) return updatePanel(' | Nada que deshacer');
        gameState.pieces = gameState.history.pop();
        gameState.moveCount--;
        updatePanel(' | Movimiento deshecho');
        renderPieces(gameState);
    }

    function resetGame() {
        gameState.pieces = initPieces();
        gameState.turn = 'white';
        gameState.moveCount = 0;
        gameState.history = [];
        updatePanel(' | Tablero reiniciado');
        renderPieces(gameState);
    }
}
