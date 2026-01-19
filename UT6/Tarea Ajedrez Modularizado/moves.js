export function getPawnMoves(pos, state) {
    const file = pos[0];
    const rank = parseInt(pos[1]);
    const moves = [];

    moves.push(`${file}${rank + 1}`);

    if (rank === 2) {
        moves.push(`${file}${rank + 2}`);
    }
    return moves;
}