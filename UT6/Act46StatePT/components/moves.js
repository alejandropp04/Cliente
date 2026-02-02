const letras = ["a","b","c","d","e","f","g","h"];

export function colorPieza(pieza) {
    if (pieza === "♙" || pieza === "♖" || pieza === "♕" || pieza === "♔") return "blanca";
    if (pieza === "♟" || pieza === "♜" || pieza === "♛" || pieza === "♚") return "negra";
    return null;
}

// --------------------
// PEÓN
// --------------------
export function movimientosPeon(origen, piezas) {
    const pieza = piezas[origen];
    const color = (pieza === "♙" || pieza === "♟") ? colorPieza(pieza) : null;
    if (!color) return [];

    const letra = origen[0];
    const fila = parseInt(origen[1], 10);
    const col = letras.indexOf(letra);

    const dir = color === "blanca" ? +1 : -1;
    const filaInicial = color === "blanca" ? 2 : 7;

    const destinos = [];

    // 1 paso frontal (solo si está libre)
    const fila1 = fila + dir;
    if (fila1 >= 1 && fila1 <= 8) {
        const frente1 = `${letra}${fila1}`;
        if (!piezas[frente1]) {
            destinos.push(frente1);

            // 2 pasos desde fila inicial (si ambos libres)
            const fila2 = fila + 2 * dir;
            if (fila === filaInicial && fila2 >= 1 && fila2 <= 8) {
                const frente2 = `${letra}${fila2}`;
                if (!piezas[frente2]) destinos.push(frente2);
            }
        }
    }

    // Capturas diagonales (solo si hay rival)
    const filaDiag = fila + dir;
    if (filaDiag >= 1 && filaDiag <= 8) {
        // izquierda
        if (col > 0) {
            const posIzq = `${letras[col - 1]}${filaDiag}`;
            const t = piezas[posIzq];
            if (t && colorPieza(t) !== color) destinos.push(posIzq);
        }
        // derecha
        if (col < 7) {
            const posDer = `${letras[col + 1]}${filaDiag}`;
            const t = piezas[posDer];
            if (t && colorPieza(t) !== color) destinos.push(posDer);
        }
    }

    return destinos;
}

// --------------------
// TORRE
// --------------------
export function movimientosTorre(origen, piezas) {
    const pieza = piezas[origen];
    if (pieza !== "♖" && pieza !== "♜") return [];

    const color = colorPieza(pieza);
    if (!color) return [];

    const col0 = letras.indexOf(origen[0]);
    const fila0 = parseInt(origen[1], 10);

    const destinos = [];

    function recorrer(dc, df) {
        let col = col0 + dc;
        let fila = fila0 + df;

        while (col >= 0 && col <= 7 && fila >= 1 && fila <= 8) {
            const pos = `${letras[col]}${fila}`;
            const t = piezas[pos];

            if (!t) {
                destinos.push(pos);
            } else {
                if (colorPieza(t) !== color) destinos.push(pos); // captura
                break; // bloquea
            }

            col += dc;
            fila += df;
        }
    }

    recorrer(0, +1); // arriba
    recorrer(0, -1); // abajo
    recorrer(+1, 0); // derecha
    recorrer(-1, 0); // izquierda

    return destinos;
}

// --------------------
// REY (+ ENROQUE SIMPLE)
// --------------------
export function movimientosRey(origen, piezas, castleFlags) {
    const pieza = piezas[origen];
    if (pieza !== "♔" && pieza !== "♚") return [];

    const color = colorPieza(pieza);
    if (!color) return [];

    const col0 = letras.indexOf(origen[0]);
    const fila0 = parseInt(origen[1], 10);

    const destinos = [];

    // 1 casilla alrededor (sin jaque)
    for (let dc = -1; dc <= 1; dc++) {
        for (let df = -1; df <= 1; df++) {
            if (dc === 0 && df === 0) continue;

            const col = col0 + dc;
            const fila = fila0 + df;
            if (col < 0 || col > 7 || fila < 1 || fila > 8) continue;

            const pos = `${letras[col]}${fila}`;
            const t = piezas[pos];
            if (!t || colorPieza(t) !== color) destinos.push(pos);
        }
    }

    // Enroque simple: solo “no movidos” + casillas vacías
    // NOTA: no se comprueba jaque.
    if (!castleFlags) return destinos;

    if (color === "blanca" && origen === "e1" && !castleFlags.wK) {
        // corto: e1 -> g1 (torre h1 -> f1)
        if (!castleFlags.wRh && piezas["h1"] === "♖" && !piezas["f1"] && !piezas["g1"]) {
            destinos.push("g1");
        }
        // largo: e1 -> c1 (torre a1 -> d1)
        if (!castleFlags.wRa && piezas["a1"] === "♖" && !piezas["b1"] && !piezas["c1"] && !piezas["d1"]) {
            destinos.push("c1");
        }
    }

    if (color === "negra" && origen === "e8" && !castleFlags.bK) {
        // corto: e8 -> g8 (torre h8 -> f8)
        if (!castleFlags.bRh && piezas["h8"] === "♜" && !piezas["f8"] && !piezas["g8"]) {
            destinos.push("g8");
        }
        // largo: e8 -> c8 (torre a8 -> d8)
        if (!castleFlags.bRa && piezas["a8"] === "♜" && !piezas["b8"] && !piezas["c8"] && !piezas["d8"]) {
            destinos.push("c8");
        }
    }

    return destinos;
}