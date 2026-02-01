// Calcula los movimientos legales de un peón
// - Avance frontal (1 o 2 desde fila inicial)
// - Captura diagonal

function colorPeon(pieza){
    if(pieza === "♙") return "blanca";
    if(pieza === "♟") return "negra";
    return null;
}

export function movimientosPeon(origen, piezas){
    const pieza = piezas[origen];
    const color = colorPeon(pieza);
    if(!color) return [];

    const letra = origen[0];
    const fila = parseInt(origen[1], 10);

    const dir = color === "blanca" ? +1 : -1;
    const filaInicial = color === "blanca" ? 2 : 7;

    const destinos = [];

    // 1 Paso hacia delante
    const fila1 = fila + dir;
    const frente1 = `${letra}${fila1}`;
    if(fila1 >= 1 && fila1 <= 8 && !piezas[frente1]){
        destinos.push(frente1);

        // 2 Pasos hacia delante si estás en la fila inicial y si el destino está libre
        const fila2 = fila + 2 * dir;
        const frente2 = `${letra}${fila2}`;
        if (fila === filaInicial && fila2 >= 1 && fila2 <= 8 && !piezas[frente2]) {
            destinos.push(frente2);
        }
    }

    // Captura diagonal
    const letras = ['a','b','c','d','e','f','g','h'];
    const col = letras.indexOf(letra);
    const filaDiag = fila + dir;

    if (filaDiag >= 1 && filaDiag <= 8) {
        // Diagonal izquierda: col - 1
        if (col > 0) {
            const posIzq = `${letras[col - 1]}${filaDiag}`;
            const target = piezas[posIzq];
            if (target && colorPeon(target) !== color) {
                destinos.push(posIzq);
            }
        }

        // Diagonal derecha: col + 1
        if (col < 7) {
            const posDer = `${letras[col + 1]}${filaDiag}`;
            const target = piezas[posDer];
            if (target && colorPeon(target) !== color) {
                destinos.push(posDer);
            }
        }
    }

    return destinos;
}
