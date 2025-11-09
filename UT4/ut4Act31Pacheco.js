//Ejercicio 31
// 1. Registra jugadas en un array
// 2. usa filter() para obtener solo las capturas (jugadas con "x")
// 3. Usa map() para numerarlas
// 4. Usa reduce () para contar cuentas jugadas totales hubo
// 5. Muestra el resumen por consola

let jugadas = [
    "c4 e5",
    "d4 d5",
    "f3 xc6",
    "c6 d6",
    "e4 xe5",
    "d4 e4",
    "e5 xf6",
];
let capturas = jugadas.filter(jugada => jugada.includes("x"));
let capturasNumeradas = capturas.map((jugada, index) => `${index + 1}. ${jugada}`);
let totalJugadas = jugadas.reduce((total) => total + 1, 0);

console.log("Resumen de jugadas:");
console.log(`Jugadas totales: ${totalJugadas}`);
console.log(`Capturas: ${capturas.length}`);
console.log(`Media por jugador: ${ (totalJugadas / 2).toFixed(2) }`);
console.log("Capturas numeradas:");
capturasNumeradas.forEach(captura => console.log(captura));