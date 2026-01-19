import { gameState } from './state.js';
import { createBoard } from './board.js';
import { renderPieces } from './pieces.js';
import { initEvents } from './events.js';

export function render() {
    renderPieces(gameState);
}

function initGame() {
    createBoard();
    initEvents();
    render();
}

initGame();
