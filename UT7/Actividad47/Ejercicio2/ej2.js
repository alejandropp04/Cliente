//Hacer peticiones con Fetch async
async function cargarMovimientos() {
    try {
        const response = await fetch("movimientos.json")
        const data = await response.json();
        data.movimientos.forEach(movimiento => {
            console.log(`${movimiento.pieza}: ${movimiento.from} → ${movimiento.to}`);
        });
    } catch (error) {
        console.error("Error al cargar el archivo JSON:", error);
    }
}

cargarMovimientos();