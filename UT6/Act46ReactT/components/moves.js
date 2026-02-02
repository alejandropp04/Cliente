// Movimientos: peón (incluye en passant), torre, rey (incluye enroque)

function colorPieza(pieza){
    if(pieza === "♙" || pieza === "♖" || pieza === "♕" || pieza === "♔") return "blanca";
    if(pieza === "♟" || pieza === "♜" || pieza === "♛" || pieza === "♚") return "negra";
    return null;
}

const letras = ['a','b','c','d','e','f','g','h'];

export function movimientosPeon(origen, piezas, enPassant){
    const pieza = piezas[origen];
    const color = (pieza === "♙" || pieza === "♟") ? colorPieza(pieza) : null;
    if(!color) return [];

    const letra = origen[0];
    const fila = parseInt(origen[1], 10);
    const col = letras.indexOf(letra);

    const dir = color === "blanca" ? +1 : -1;
    const filaInicial = color === "blanca" ? 2 : 7;

    const destinos = [];

    // 1) Avance frontal 1
    const fila1 = fila + dir;
    const frente1 = `${letra}${fila1}`;
    if(fila1 >= 1 && fila1 <= 8 && !piezas[frente1]){
        destinos.push(frente1);

        // 2) Avance frontal 2 desde fila inicial (si ambos libres)
        const fila2 = fila + 2 * dir;
        const frente2 = `${letra}${fila2}`;
        if (fila === filaInicial && fila2 >= 1 && fila2 <= 8 && !piezas[frente2]) {
            destinos.push(frente2);
        }
    }

    // 3) Captura diagonal normal
    const filaDiag = fila + dir;
    if (filaDiag >= 1 && filaDiag <= 8) {
        // izq
        if (col > 0) {
            const posIzq = `${letras[col - 1]}${filaDiag}`;
            const target = piezas[posIzq];
            if (target && colorPieza(target) !== color) destinos.push(posIzq);
        }
        // der
        if (col < 7) {
            const posDer = `${letras[col + 1]}${filaDiag}`;
            const target = piezas[posDer];
            if (target && colorPieza(target) !== color) destinos.push(posDer);
        }
    }

    // 4) En passant (comer al paso)
    // enPassant: { square: "e3", pawnPos: "e4", capturableBy: "negra" } por ejemplo
    if (enPassant && enPassant.square && enPassant.capturableBy === color) {
        const ep = enPassant.square; // casilla a la que “entra” el peón capturador
        const epCol = letras.indexOf(ep[0]);
        const epFila = parseInt(ep[1], 10);

        // Para ser en-passant: debe estar en la diagonal de avance 1
        if (epFila === fila + dir && Math.abs(epCol - col) === 1) {
            // Además la casilla ep debe estar vacía (en passant siempre captura “al aire”)
            if (!piezas[ep]) destinos.push(ep);
        }
    }

    return destinos;
}

export function movimientosTorre(origen, piezas){
    const pieza = piezas[origen];
    if (pieza !== "♖" && pieza !== "♜") return [];

    const color = colorPieza(pieza);
    if (!color) return [];

    const col0 = letras.indexOf(origen[0]);
    const fila0 = parseInt(origen[1], 10);

    const destinos = [];

    function recorrer(dc, df){
        let col = col0 + dc;
        let fila = fila0 + df;

        while (col >= 0 && col <= 7 && fila >= 1 && fila <= 8) {
            const pos = `${letras[col]}${fila}`;
            const target = piezas[pos];

            if (!target) {
                destinos.push(pos);
            } else {
                if (colorPieza(target) !== color) destinos.push(pos);
                break;
            }

            col += dc;
            fila += df;
        }
    }

    recorrer(0, +1);
    recorrer(0, -1);
    recorrer(+1, 0);
    recorrer(-1, 0);

    return destinos;
}

export function movimientosRey(origen, piezas, castleFlags) {
    const pieza = piezas[origen];
    if (pieza !== "♔" && pieza !== "♚") return [];

    const color = colorPieza(pieza);
    if (!color) return [];

    const col0 = letras.indexOf(origen[0]);
    const fila0 = parseInt(origen[1], 10);

    const destinos = [];

    // Movimiento normal (1 casilla)
    for (let dc = -1; dc <= 1; dc++) {
        for (let df = -1; df <= 1; df++) {
            if (dc === 0 && df === 0) continue;

            const col = col0 + dc;
            const fila = fila0 + df;
            if (col < 0 || col > 7 || fila < 1 || fila > 8) continue;

            const pos = `${letras[col]}${fila}`;
            const target = piezas[pos];
            if (!target || colorPieza(target) !== color) destinos.push(pos);
        }
    }

    // ENROQUE (simple): solo casillas vacías + "no se movieron"
    if (!castleFlags) return destinos;

    if (color === "blanca" && origen === "e1" && !castleFlags.wK) {
        // corto: rey e1->g1, torre h1
        if (!castleFlags.wRh && piezas["h1"] === "♖" && !piezas["f1"] && !piezas["g1"]) {
            destinos.push("g1");
        }
        // largo: rey e1->c1, torre a1
        if (!castleFlags.wRa && piezas["a1"] === "♖" && !piezas["b1"] && !piezas["c1"] && !piezas["d1"]) {
            destinos.push("c1");
        }
    }

    if (color === "negra" && origen === "e8" && !castleFlags.bK) {
        // corto: rey e8->g8, torre h8
        if (!castleFlags.bRh && piezas["h8"] === "♜" && !piezas["f8"] && !piezas["g8"]) {
            destinos.push("g8");
        }
        // largo: rey e8->c8, torre a8
        if (!castleFlags.bRa && piezas["a8"] === "♜" && !piezas["b8"] && !piezas["c8"] && !piezas["d8"]) {
            destinos.push("c8");
        }
    }

    return destinos;
}