document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");

    createBoard(board);
    placePawns();
    enablePawnMovement();
});
