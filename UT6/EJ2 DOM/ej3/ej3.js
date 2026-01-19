const gameState = {
    pawns: ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"]
}

const board = document.getElementById('board');

//Contenedor de botones y contador
const controlsContainer = document.createElement('div');
board.appendChild(controlsContainer);

//Crear botones
//Boton añadir
const anyadir = document.createElement("button");
anyadir.textContent = "Añadir Peon";
board.appendChild(anyadir);

//Boton eliminar
const eliminar = document.createElement("button");
eliminar.textContent = "Eliminar Peon";
board.appendChild(eliminar);

//Contador
const contador = document.createElement('h2');
board.appendChild(contador);

const pawnsContainer = document.createElement('div');
board.appendChild(pawnsContainer);

//Funcion que actuliza peones y contador
function renderPawns() {
    // Limpiar el contenedor de peones
    pawnsContainer.innerHTML = '';

    // Crear un div por cada peón en el array
    for (const pawn of gameState.pawns) {
        const div = document.createElement('div');
        div.textContent = pawn;
        div.style.display = 'inline-block';
        div.style.margin = '5px';
        pawnsContainer.appendChild(div);
    }

    // Actualizar contador
    contador.textContent = `Número de peones: ${gameState.pawns.length}`;
}

//Eventos
anyadir.addEventListener("click", () => {
    gameState.pawns.push("♙");
    renderPawns();
});

eliminar.addEventListener("click", () => {
    if(gameState.pawns.length > 0){
        gameState.pawns.pop();
        renderPawns();
    }
});

renderPawns();