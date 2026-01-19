import { gameState } from './gameState.js';

const letters = ['a','b','c','d','e','f','g','h'];

export function initPieces() {
    const pieces = [];
    for(let i=0; i<8; i++){
        pieces.push({ type:'pawn', pos:`${letters[i]}2`, color:'white' });
    }
    return pieces;
}

export function renderPieces(state) {
    const cells = document.querySelectorAll('.square');
    cells.forEach(c => { c.textContent = ''; c.classList.remove('highlight'); });

    state.pieces.forEach(piece => {
        const cell = document.querySelector(`.square[data-pos="${piece.pos}"]`);
        if(cell) cell.textContent = piece.type === 'pawn' ? '♙' : '';
    });
}

export function getPawnMoves(pos) {
    const file = pos[0];
    const rank = parseInt(pos[1]);
    const moves = [];
    if(rank < 8) moves.push(`${file}${rank+1}`);
    if(rank === 2) moves.push(`${file}${rank+2}`);
    return moves;
}
