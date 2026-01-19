//Obtener <p> a traves de querySelectorAll y cambiar su contenido
const parrafo = document.querySelectorAll('p');

//Mostrar el contenido original en consola
parrafo.forEach(parrafo => {
    console.log(parrafo.textContent);
});

//Cambiar el contenido a "Mensaje actualizado"
parrafo.forEach(parrafo => {
    parrafo.textContent = "Mensaje actualizado";
});