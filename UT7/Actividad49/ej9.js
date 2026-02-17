const btnXhr = document.getElementById("btnXhr");
const btnFetch = document.getElementById("btnFetch");
const lista = document.getElementById("lista");
const pError = document.getElementById("error");

btnFetch.addEventListener("click", cargarFetch);
btnXhr.addEventListener("click", cargarXHR);

//Limpiarmos la lista y el error
function limpiar() {
    lista.innerHTML = "";
    pError.textContent = "";
}

//Funcion para pintar el resultado
function pintar(data){
    data.movimientos.forEach(mov => {
        const li = document.createElement("li");
        li.textContent = `${mov.pieza}: ${mov.from} -> ${mov.to}`;
        lista.appendChild(li);
    });
}

//Ajax clasico - XMLHTTPRequest
function cargarXHR(){
    limpiar();

    const xhr = new XMLHttpRequest();
    xhr.open("GET", "movimientos.json", true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            pintar(data);
        } else {
            pError.textContent = `Error al cargar el archivo: ${xhr.status}`;
        }
    };

    xhr.onerror = function() {
        pError.textContent = "Error de red al cargar el archivo.";
    };

    xhr.send();
}

//Fetch moderno
async function cargarFetch() {
    limpiar();
    try {
        const response = await fetch("movimientos.json");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        pintar(data);
    } catch (error) {
        pError.textContent = `Error al cargar el archivo: ${error.message}`;
    }
}

/* Xhr es más extenso, con más codigo, pero es compatible con navegadores antiguos.
Fetch es más moderno, con una sintaxis más limpia y fácil de leer, pero no es compatible con navegadores antiguos.
En general, se recomienda usar Fetch para proyectos modernos,
pero XHR puede ser necesario para compatibilidad con navegadores antiguos.
 */