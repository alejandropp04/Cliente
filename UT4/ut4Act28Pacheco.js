let Njugadas = prompt("Cuantas jugadas desea introducir");
let jugada = "";
let jugadas = [];
for (let i=0; i<Njugadas; i++) {
    jugada = prompt(`Introduzca la jugada ${i}:`);
    jugadas.push(jugada); //Añadir jugada al array
}
let eliminar = confirm("¿Desea eliminar la ultima jugada?");
if(eliminar) {
    jugadas.pop();
}
console.log(jugadas);
console.log(`Jugadas registradas ${jugadas.length}`);
console.log(`Primera jugada: ${jugadas[0]}`);
console.log(`Ultima jugada: ${jugadas[jugadas.length - 1]}`);