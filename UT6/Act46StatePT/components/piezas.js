export function generarPiezasIniciales() {
    const letras = ["a","b","c","d","e","f","g","h"];
    const piezas = {};

    // Peones blancos (fila 2)
    for (let i = 0; i < 8; i++) {
        piezas[`${letras[i]}2`] = "♙";
    }

    // Peones negros (fila 7)
    for (let i = 0; i < 8; i++) {
        piezas[`${letras[i]}7`] = "♟";
    }

    // Torres blancas (a1, h1)
    piezas["a1"] = "♖";
    piezas["h1"] = "♖";

    // Torres negras (a8, h8)
    piezas["a8"] = "♜";
    piezas["h8"] = "♜";

    // Reyes (necesarios para enroque)
    piezas["e1"] = "♔";
    piezas["e8"] = "♚";

    return piezas;
}
