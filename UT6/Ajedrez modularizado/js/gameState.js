export const gameState = {
    pieces: [],
    turn: 'white',
    moveCount: 0,
    history: []
};

export function toggleTurn() {
    gameState.turn = gameState.turn === 'white' ? 'black' : 'white';
}

export function saveHistory() {
    gameState.history.push(JSON.parse(JSON.stringify(gameState.pieces)));
}
