//Obtener los elementos .item
const items = document.querySelectorAll('.item');

//Recorrer los elementos con for of
for (const item of items) {
    //Mostrar el contenido original en consola
    console.log(item.textContent);
}

//Cambiar elementos a "Elemento 1", "Elemento 2", etc.
let contador = 1;
for (const item of items) {
    item.textContent = `Elemento ${contador}`;
    contador++;
}