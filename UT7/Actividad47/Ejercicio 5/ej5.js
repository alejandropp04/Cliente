//Extraemos los ids
const btnHistorial = document.getElementById("btnHistorial");
const historial = document.getElementById("historial");

//Añadimos el evento click al botón
btnHistorial.addEventListener("click", cargarHistorial);

//Cargamos el historial con async
async function cargarHistorial() {
    //Limpiamos el histortial anterior
    historial.innerHTML = "";

    try{
        //volvemos a cargar los movimientos
        const movimientos = await cargarMovimientos();
        //Mostramos el historial
        pintarMovimientos(movimientos);
    } catch (error) {
        console.error("Error al cargar el historial:", error);
        //Mostrar mensaje de error en la lista
        historial.innerHTML = "<li>No se han podido cargar los datos</li>";
    }
}

//Cargar los movimientos con fetch + async/await
async function cargarMovimientos() {
    const response = await fetch("movimientos.json");
    if (!response.ok) {
        throw new Error("No se han podido cargar los datos");
    }
    const data = await response.json();
    return data.movimientos;
}

//funcion para pintar los movimientos en el historial
function pintarMovimientos(movimientos) {
    //Si no hay movimientos, mostramos un mensaje
    if (movimientos.length === 0) {
        historial.innerHTML = "<li>No hay movimientos en el historial</li>";
        return;
    }

    //Pintamos cada movimiento en la lista
    movimientos.forEach((movimiento) => {
        const li = document.createElement("li");
        li.textContent = `${movimiento.pieza}: ${movimiento.from} → ${movimiento.to}`;
        historial.appendChild(li);
    });
}