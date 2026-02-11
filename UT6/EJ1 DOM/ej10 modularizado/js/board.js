export function createBoard(boardElement) {
    const files = ["a","b","c","d","e","f","g","h"];

    for (let row = 8; row >= 1; row--) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.classList.add((row + col) % 2 === 0 ? "light" : "dark");

            square.dataset.pos = files[col] + row;

            // Estilo inline para centrar y agrandar el peón
            square.style.display = "flex";
            square.style.alignItems = "center";
            square.style.justifyContent = "center";
            square.style.fontSize = "32px";

            boardElement.appendChild(square);
        }
    }
}

export function placeInitialPawn() {
    const e2 = document.querySelector('[data-pos="e2"]');
    e2.textContent = "♙";
    e2.dataset.moved = "false"; // marcador para saber si se movió
}
