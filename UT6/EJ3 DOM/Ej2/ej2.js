//Añadir un unico listener a ul id="menu"
const menu = document.getElementById("menu");
const output = document.getElementById("output")
menu.addEventListener("click", (event) => {
    //Detectar que li fue clicado
    if (event.target.tagName !== "LI") return;
    //Leer data-section
    const section = event.target.dataset.section;
    //Mostrar en output
    output.textContent = `Seccion seleccionada: ${section}`
});