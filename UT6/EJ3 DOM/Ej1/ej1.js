//Crear un objeto state con la propiedad value
const state = {
    value : 0
}

//Acceder al DOM
const counter = document.getElementById("counter");
const incrementar = document.getElementById("inc");
const decrementar = document.getElementById("dec");

//funcion render para actualizar el DOM desde el estado
function render(){
    counter.textContent = state.value;
}

incrementar.addEventListener("click", () => {
    state.value++;
    render ();
})
decrementar.addEventListener("click", () =>{
    state.value--;
    render ();
})

render()