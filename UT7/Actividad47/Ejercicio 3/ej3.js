const boton = document.getElementById("boton");
const perror = document.getElementById("error");

boton.addEventListener("click", cargarDatos);

async function cargarDatos() {
    try {
        const response = await fetch("datos.json");

        if (!response.ok) {
            throw new Error("No se han podidio cargar los datos");
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        perror.textContent = "No se han podido cargar los datos";
        console.error(error);
    }
}