const files = ["a","b","c","d","e","f","g","h"];

function createBoard(boardElement) {
    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 0 ? "light" : "dark");

            square.dataset.file = files[col];
            square.dataset.rank = row;

            // estilos inline para centrado y tamaño
            square.style.display = "flex";
            square.style.alignItems = "center";
            square.style.justifyContent = "center";
            square.style.fontSize = "32px";

            boardElement.appendChild(square);
        }
    }
}

function placePawns() {
    document.querySelectorAll(".square").forEach(square => {
        if (square.dataset.rank === "2") {
            square.textContent = "♙";
            square.dataset.moved = "false";
        }
        if (square.dataset.rank === "7") {
            square.textContent = "♟";
            square.dataset.moved = "false";
        }
    });
}
