//Hacer peticiones con Fetch async
async function cargarMovimientos() {
    try {
        const response = await fetch("movimientos.json")
        const data = await response.json();
        // Mostrar  los movimientos en una lista <ul> en el html
        const lista = document.getElementById("lista");
        data.movimientos.forEach(movimiento => {
            const li = document.createElement("li");
            movimiento = `${movimiento.pieza}: ${movimiento.from} → ${movimiento.to}`;
            li.textContent = movimiento;
            lista.appendChild(li);
        });
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}
cargarMovimientos();