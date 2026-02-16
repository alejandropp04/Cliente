const boton = document.getElementById("boton");
const filtroInput = document.getElementById("filtro");
const perror = document.getElementById("error");
const lista = document.getElementById("lista");

// Endpoint correcto con parámetro obligatorio
const URL = "https://explorer.lichess.ovh/masters?play=e2e4";

let movimientos = [];

boton.addEventListener("click", cargarMovimientos);
filtroInput.addEventListener("input", pintar);

async function cargarMovimientos() {
    lista.innerHTML = "";
    perror.textContent = "";

    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // En este endpoint los movimientos vienen en data.moves
        movimientos = data.moves;

        pintar();
    } catch (error) {
        perror.textContent = "No se han podido cargar los datos";
        console.error(error);
    }
}

function pintar() {
    lista.innerHTML = "";

    const texto = filtroInput.value.toLowerCase();

    // B) Más de 1000 partidas
    let filtrados = movimientos.filter(m =>
        (m.white + m.black + m.draws) > 1000
    );

    // C) Filtrar por nombre del movimiento (SAN)
    filtrados = filtrados.filter(m =>
        m.san.toLowerCase().includes(texto)
    );

    // A) Mostrar 10
    filtrados.slice(0, 10).forEach(m => {
        const total = m.white + m.black + m.draws;
        const li = document.createElement("li");
        li.textContent = `${m.san} (${total} partidas)`;
        lista.appendChild(li);
    });

    if (filtrados.length === 0) {
        lista.innerHTML = "<li>No hay resultados</li>";
    }
}
