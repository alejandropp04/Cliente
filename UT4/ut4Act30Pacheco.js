//Ejercicio 30
// 1. Guarde en un array varias jugadas (algunas repetidas)
// Muestre cuantas veces aparece cada jugada

let jugadas = ["c4 e5", "d4 d5", "c4 e5", "e4 e5", "d5 f5", "e4 e5"];
let conteoJugadas = {};

for (let jugada of jugadas) {
    if (conteoJugadas[jugada]) {
        conteoJugadas[jugada]++;
    } else {
        conteoJugadas[jugada] = 1;
    }
}
for (let jugada in conteoJugadas) {
    console.log(`La jugada "${jugada}" aparece ${conteoJugadas[jugada]} veces.`);
}