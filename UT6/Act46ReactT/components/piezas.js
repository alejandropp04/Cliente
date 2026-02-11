export function generarPiezas(){
    const letras = ['a','b','c','d','e','f','g','h'];
    const piezas = {};

    //Peones blancos
    for (let i=0; i<8; i++){
        piezas[`${letras[i]}2`] = "♙";
    }

    //Peones negros
    for (let i=0; i< 8; i++){
        piezas[`${letras[i]}7`] = "♟"
    }

    //Torres blancas
    piezas["a1"] = "♖";
    piezas["h1"] = "♖";

    //Torres negras
    piezas["a8"] = "♜";
    piezas["h8"] = "♜";

    // Rey blanco y rey negro
    piezas["e1"] = "♔";
    piezas["e8"] = "♚";

    return piezas;
}