export function crearTableroDOM({ piezas, selected, moves, onSquareClick }) {
    const wrapper = document.createElement("div");
    wrapper.className = "board-wrapper";

    // Coordenadas izquierda (8..1)
    const coordsLeft = document.createElement("div");
    coordsLeft.className = "coords-left";
    for (let fila = 8; fila >= 1; fila--) {
        const n = document.createElement("div");
        n.className = "coord-num";
        n.textContent = String(fila);
        coordsLeft.appendChild(n);
    }

    // Tablero 8x8
    const board = document.createElement("div");
    board.className = "board";

    const letras = ["a","b","c","d","e","f","g","h"];

    for (let fila = 8; fila >= 1; fila--) {
        for (let col = 0; col < 8; col++) {
            const pos = `${letras[col]}${fila}`;
            const esOscura = (fila + col) % 2 === 0;

            const square = document.createElement("div");
            square.className = `square ${esOscura ? "dark" : "light"}`;
            square.dataset.pos = pos;

            // Pintar pieza (si existe)
            square.textContent = piezas[pos] || "";

            // Resaltar selección / movimientos
            if (pos === selected) square.classList.add("selected");
            if (moves.includes(pos)) square.classList.add("move");

            // Click -> notifica posición
            square.addEventListener("click", () => {
                onSquareClick(pos);
            });

            board.appendChild(square);
        }
    }

    // Coordenadas abajo (A..H)
    const coordsBottom = document.createElement("div");
    coordsBottom.className = "coords-bottom";
    for (let i = 0; i < 8; i++) {
        const l = document.createElement("div");
        l.className = "coord-let";
        l.textContent = letras[i].toUpperCase();
        coordsBottom.appendChild(l);
    }

    wrapper.appendChild(coordsLeft);
    wrapper.appendChild(board);
    wrapper.appendChild(coordsBottom);

    return wrapper;
}
