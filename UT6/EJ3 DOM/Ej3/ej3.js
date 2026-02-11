const gameState = {
    moves : 0
};

const info = document.getElementById("info");
const boton = document.getElementById("addMove");
boton.addEventListener("click", () =>{
    gameState.moves +=1;
    render();
})

function render(){
    info.textContent = `Jugadas realizadas: ${gameState.moves}`
}