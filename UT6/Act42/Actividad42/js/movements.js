// movements.js
// Reglas de movimiento para cada tipo de pieza.

/**
 * Valida si un movimiento es legal para una pieza dada.
 * @param {string} origen - ID de la casilla de origen (ej. "e2").
 * @param {string} destino - ID de la casilla de destino (ej. "e4").
 * @param {string} pieza - Símbolo de la pieza (ej. "♙").
 * @returns {boolean} - True si el movimiento es válido.
 */
export function esMovimientoValido(origen, destino, pieza) {
    const fileOrigen = origen[0];
    const rankOrigen = parseInt(origen[1]);
    const fileDestino = destino[0];
    const rankDestino = parseInt(destino[1]);
    const diffRank = rankDestino - rankOrigen;
    const diffFile = Math.abs(fileOrigen.charCodeAt(0) - fileDestino.charCodeAt(0));

    switch (pieza) {
        case '♙':
            return validarPeonBlanco(fileOrigen, rankOrigen, fileDestino, rankDestino, diffRank, diffFile);

        default:
            console.warn(`Pieza no reconocida o lógica no implementada para: ${pieza}`);
            return false;
    }
}

// Reglas específicas para el peón blanco
function validarPeonBlanco(fileOrigen, rankOrigen, fileDestino, rankDestino, diffRank, diffFile) {
    if (diffFile !== 0) return false; // Solo movimiento vertical

    if (diffRank === 1) return true; // 1 paso adelante

    if (diffRank === 2 && rankOrigen === 2) return true; // 2 pasos desde inicio

    return false;
}
export function obtenerDestinosValidos(origen, pieza) {
    const destinos = [];

    if (pieza === '♙') {
        const file = origen[0];
        const rank = parseInt(origen[1]);

        destinos.push(`${file}${rank + 1}`);
        if (rank === 2) {
            destinos.push(`${file}${rank + 2}`);
        }
    }

    return destinos;
}
