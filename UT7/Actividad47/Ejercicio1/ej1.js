fetch("movimientos.json")
    .then(response => response.json())
    .then(data => {
        data.movimientos.forEach(movimiento => {
            console.log(`${movimiento.pieza}: ${movimiento.from} → ${movimiento.to}`);
        });
    })
    .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
    });