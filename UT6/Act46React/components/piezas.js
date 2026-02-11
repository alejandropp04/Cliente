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
    return piezas;
}