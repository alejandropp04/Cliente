const input = document.getElementById("buscador");
const lista = document.getElementById("lista");

let servicios = []; // aquí guardamos los datos cargados

// 1) Cargar servicios con fetch
cargarServicios();

async function cargarServicios() {
    try {
        const res = await fetch("servicios.json");
        const data = await res.json();
        servicios = data.servicios;
        pintar(servicios); // pintamos todo al principio
    } catch (err) {
        console.log(err);
        lista.innerHTML = "<li>No se han podido cargar los datos</li>";
    }
}

// 2) Al escribir, filtrar por nombre
input.addEventListener("input", () => {
    const texto = input.value.toLowerCase();

    const filtrados = servicios.filter(s =>
        s.nombre.toLowerCase().includes(texto)
    );

    // 3) Mostrar resultados dinámicamente
    pintar(filtrados);
});

function pintar(array) {
    lista.innerHTML = "";

    array.forEach(s => {
        lista.innerHTML += `<li>${s.nombre} - ${s.categoria}</li>`;
    });
}
