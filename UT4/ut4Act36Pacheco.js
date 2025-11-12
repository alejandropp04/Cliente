//Ejercicio 36: Tablero inicial configurable
//Crear un tablero
const tablero = [];
for (let i=0; i< 8; i++){
    tablero[i] = new Array(8).fill(". ");
}

//Colocar las piezas negras (filas 0 y 1)
tablero [0] = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"];
tablero [1] = Array(8).fill("♟");

//Colocar piezas blancas filas (6 y 7)
tablero [6] = Array(8).fill("♙");
tablero [7] = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"];

//Funcion mostrar tablero
function mostrarTablero(){
    console.clear();
    console.log("  A  B  C  D  E  F  G  H");
    for (let fila=0; fila < 8; fila ++){
        console.log((8-fila) + " " + tablero[fila].join(" "));
    }
}

//Convertir coordenadas tipo "E2" a indices de array
function convertirPosicion(pos){
    const columnas = "ABCDEFGH";
    const col = columnas.indexOf(pos[0].toUpperCase());
    const fila = 8 - parseInt(pos[1]);
    return [fila, col];
}

//Validar si la posicion esta dentro del rango del tablero
function posicionValida(fila, col){
    return fila >= 0 && fila < 8 && col >= 0 && col <= 8;
}

//Registrar movimientos
let movimientos = 0;
const historial = [];

//Ejecucion
while (true){
    mostrarTablero();

    //Pedir movimientos
    const origen = prompt("Introduzca la posicion de origen o 'salir' (Ej: C7): ");
    if(!origen || origen.toLowerCase() === "salir") break;

    const destino = prompt("Introduzca la posicion de destino (Ej: C5): ");
    if(!destino) break;

    //Convertir posiciones
    const [filaOrigen, colOrigen] = convertirPosicion(origen);
    const [filaDestino, colDestino] = convertirPosicion(destino);

    //Validar posiciones
    if(!posicionValida(filaOrigen, colOrigen) || !posicionValida(filaDestino, colDestino)){
        console.log("Movimiento fuera de rango");
    }

    //Verificar si hay pieza en el origen
    const pieza = tablero[filaOrigen][colOrigen];
    if(pieza === ". "){
        console.log("No hay ninguna pieza en la posicion de origen");
    }

    //Verificar la casilla de destino
    const destinoOcupado = tablero[filaDestino][colDestino] !== ". ";

    //Mover la pieza
    tablero[filaOrigen][colDestino] = ".";
    tablero[filaDestino][colDestino] = pieza

    //Incrementar contador y guardar en historial
    movimientos++;
    historial.push(`${pieza} de ${origen.toUpperCase()} a ${destino.toUpperCase()}`);

    //Mostrar resultado
    mostrarTablero();
    console.log(destinoOcupado ? "La casilla de destino estaba ocupada (captura)." : "Movimiento realizado correctamente");
    console.log(`Movimientos realizado: ${movimientos}`);
    console.log("Historial de movimientos");
    historial.forEach((mov, i) => console.log(`"{i + 1}. ${mov}`));
    alert(destinoOcupado ? "Casilla destino ocupada (captura realizada).": "Movimiento realizado correctamente");
}