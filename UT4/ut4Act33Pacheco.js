// Clase Pieza
class Pieza {
    constructor(nombre, color) {
        this.nombre = nombre;
        this.color = color;
    }
}

// Clase Jugador
class Jugador {
    constructor(nombre, elo = 1200) {
        this.nombre = nombre;
        this.elo = elo;
        this.partidasJugadas = 0;
        this.partidasGanadas = 0;
    }

    // Método ganar partida
    ganarPartida() {
        this.partidasJugadas++;
        this.partidasGanadas++;
        this.elo += 100; // Gana 100 puntos por victoria
    }

    // Método perder partida
    perderPartida() {
        this.partidasJugadas++;
        this.elo -= 50; // Pierde 50 puntos por derrota
    }
}

// Clase Partida
class Partida {
    constructor(jugador1, jugador2) {
        this.jugador1 = jugador1;
        this.jugador2 = jugador2;
        this.ganador = null;
    }

    // Método jugar
    jugar() {
        const ganador = Math.random() < 0.5 ? this.jugador1 : this.jugador2;
        this.ganador = ganador;

        // Actualizar estadísticas correctamente
        if (ganador === this.jugador1) {
            this.jugador1.ganarPartida();
            this.jugador2.perderPartida();
        } else {
            this.jugador2.ganarPartida();
            this.jugador1.perderPartida();
        }

        console.log(`🏁 ${this.jugador1.nombre} vs ${this.jugador2.nombre} → Ganador: ${this.ganador.nombre}`);
    }
}

// SIMULACIÓN DEL TORNEO

// Crear jugadores
const jugadores = [
    new Jugador("Alex"),
    new Jugador("Carlos"),
    new Jugador("Antonio"),
    new Jugador("Jose")
];

// Array para guardar las partidas
let partidas = [];

// Simular 6 partidas aleatorias
for (let i = 0; i < 6; i++) {
    const j1 = jugadores[Math.floor(Math.random() * jugadores.length)];
    let j2;
    do {
        j2 = jugadores[Math.floor(Math.random() * jugadores.length)];
    } while (j1 === j2); // Asegurarse de que no se enfrente a sí mismo

    const partida = new Partida(j1, j2);
    partida.jugar();
    partidas.push(partida);
}

// RESULTADOS FINALES


console.log("\n📊 Ranking final:");
jugadores.sort((a, b) => b.elo - a.elo);
console.table(jugadores.map(j => ({
    Nombre: j.nombre,
    Elo: j.elo,
    "Partidas jugadas": j.partidasJugadas,
    "Partidas ganadas": j.partidasGanadas
})));

console.log(`\nTotal de partidas jugadas: ${partidas.length}`);