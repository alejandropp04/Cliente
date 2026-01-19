export const gameState ={
    pieces: [],
    selectedPiece: null,
};

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

for (let i = 0; i < 8; i++) {
    gameState.pieces.push({
        type: 'pawn',
        pos: `${letters[i]}2`,
    });
}