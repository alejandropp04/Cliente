let jugadores = [];
let puntuacion = [];
let numJugadores = prompt("Cuantos jugadores va a introducir");
let jugador = "";
let puntos = 0;
for (let i = 0; i < numJugadores; i++) {
    jugador = prompt(`Introduzca el jugador ${i}`);
    jugadores.push(jugador);
}
for (let i = 0; i < jugadores.length; i++) {
    puntos = prompt(`Introduzca los puntos de ${jugadores[i]}`);
    puntuacion.push(puntos);
}

//Combinar dos array en un map
let clasificacion = jugadores.map((nombre, i) => ({
    nombre: nombre,
    puntos: puntuacion[i]
}));

//Ordenar la puntuacion de mayor a menor
clasificacion.sort((a, b) => b.puntos - a.puntos);
console.log(`Clasificacion ordenada:`);
clasificacion.forEach((jugador, i) => {
    console.log(`${i+1}. ${jugador.nombre} - ${jugador.puntos}`);
});