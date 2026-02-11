const boton = document.getElementById("consultar");
const info = document.getElementById("info");

boton.addEventListener("click", () => {
    fetch("movimientos.json")
        .then(response => response.json())
        .then(data => {
            console.log(data); // aquí verás el objeto completo

            info.innerHTML = "";

            data.movimientos.forEach(mov => {
                const p = document.createElement("p");
                p.textContent = `${mov.turno}. ${mov.pieza}: ${mov.from} → ${mov.to}`;
                info.appendChild(p);
            });
        })
        .catch(error => {
            console.error("Error cargando el JSON", error);
        });
});