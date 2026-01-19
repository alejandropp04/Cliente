//Obetener el div #container
const container = document.getElementById('container');

//Crear un nuevo elemento <p>
const nuevoParrafo = document.createElement('p');

//Añade el texto al parrafo: "Elemento añadido dinámicamente"
nuevoParrafo.textContent = "Elemento añadido dinamicamente";

//Añadir el nuevo parrafo al div #container
container.appendChild(nuevoParrafo);