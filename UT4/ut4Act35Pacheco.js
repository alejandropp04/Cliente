// 1.Crear array de jugadores
const jugadores = [
    { nombre: "Alex", elo: 1520, victorias: 12, derrotas: 3 },
    { nombre: "Pablo", elo: 1390, victorias: 8, derrotas: 7 },
    { nombre: "Mario", elo: 1600, victorias: 15, derrotas: 2 },
    { nombre: "Carla", elo: 1480, victorias: 10, derrotas: 5 },
    { nombre: "Laura", elo: 1550, victorias: 13, derrotas: 4 }
];

// 2. Calcular ELO medio y tasa media de victorias
const eloMedio = jugadores.reduce((acc, j) => acc + j.elo, 0) / jugadores.length;
const tasaMediaVictorias = jugadores.reduce((acc, j) => acc + j.victorias / (j.victorias + j.derrotas), 0) / jugadores.length;

console.log(`ELO medio: ${eloMedio.toFixed(2)}`);
console.log(`Tasa media de victorias: ${(tasaMediaVictorias * 100).toFixed(1)}%`);

// 3. Calcular rendimiento y ordenar para el Top 3
jugadores.forEach(j => {
    j.rendimiento = j.victorias / (j.victorias + j.derrotas); // porcentaje de victorias
});

const top3 = [...jugadores].sort((a, b) => b.rendimiento - a.rendimiento).slice(0, 3);

console.log("Top 3 jugadores por rendimiento:");
top3.forEach((j, i) => {
    console.log(`${i + 1}. ${j.nombre} - ELO: ${j.elo}, Rendimiento: ${(j.rendimiento * 100).toFixed(1)}%`);
});

// 4. Guardar ranking final en localStorage
localStorage.setItem("rankingFinal", JSON.stringify(top3));

// 5. Abrir nueva ventana con HTML dinámico
const nuevaVentana = window.open("", "Ranking", "width=500,height=400");

nuevaVentana.document.write(`
  <html>
  <head>
    <title>Ranking Final</title>
    <style>
      body { font-family: Arial; background: #f4f4f4; text-align: center; padding: 20px; }
      h1 { color: #333; }
      table { margin: 0 auto; border-collapse: collapse; width: 80%; background: white; }
      th, td { padding: 10px; border: 1px solid #ddd; }
      th { background: #4CAF50; color: white; }
    </style>
  </head>
  <body>
    <h1>Ranking Final - Top 3</h1>
    <table>
      <tr><th>Posición</th><th>Jugador</th><th>ELO</th><th>Rendimiento</th></tr>
      ${top3
    .map(
        (j, i) =>
            `<tr><td>${i + 1}</td><td>${j.nombre}</td><td>${j.elo}</td><td>${(
                j.rendimiento * 100
            ).toFixed(1)}%</td></tr>`
    )
    .join("")}
    </table>
    <p style="margin-top:20px;">ELO medio: ${eloMedio.toFixed(
    2
)} | Tasa media victorias: ${(tasaMediaVictorias * 100).toFixed(1)}%</p>
  </body>
  </html>
`);
