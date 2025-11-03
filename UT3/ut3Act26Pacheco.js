// Establece una cookie con nombre, valor y duración en días
function setCookie(nombre, valor, dias) {
    const fecha = new Date();
    fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
    const expira = "expires=" + fecha.toUTCString();
    document.cookie = `${encodeURIComponent(nombre)}=${encodeURIComponent(valor)};${expira};path=/`;
}

//Obtiene el valor de una cookie por su nombre
function getCookie(nombre) {
    const nombreEQ = encodeURIComponent(nombre) + "=";
    const cookies = document.cookie.split(';');
    for (let c of cookies) {
        c = c.trim();
        if (c.indexOf(nombreEQ) === 0) {
            return decodeURIComponent(c.substring(nombreEQ.length));
        }
    }
    return null;
}

// Elimina una cookie estableciendo su fecha de expiración en el pasado
function deleteCookie(nombre) {
    document.cookie = `${encodeURIComponent(nombre)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

// Tema del tablero
function aplicarTema(tema) {
    document.body.style.backgroundColor = (tema === "oscuro") ? "#222" : "#f0f0f0";
    document.body.style.color = (tema === "oscuro") ? "#f0f0f0" : "#222";
}

function cambiarTema() {
    const temaActual = getCookie("temaTablero") || "claro";
    const nuevoTema = (temaActual === "claro") ? "oscuro" : "claro";
    setCookie("temaTablero", nuevoTema, 30);
    aplicarTema(nuevoTema);
    alert(`Tema cambiado a: ${nuevoTema}`);
}

// Aplicar el tema guardado al cargar la página
const temaGuardado = getCookie("temaTablero") || "claro";
aplicarTema(temaGuardado);

//Ultima pieza movida
function guardarUltimaPieza(pieza) {
    let piezaMovida = prompt("Introduzca la ultima pieza movida:");
    setCookie("ultimaPieza", piezaMovida, 7);
    console.log(`Última pieza movida guardada: ${piezaMovida}`);
}

// Mostrar última visita
function mostrarUltimaVisita() {
    const ultimaVisita = getCookie("ultimaVisita");
    if (ultimaVisita) {
        alert(`Bienvenido de nuevo. Tu última visita fue el: ${ultimaVisita}`);
    } else {
        alert("¡Bienvenido! Es tu primera visita.");
    }
    const fechaActual = new Date().toLocaleString();
    setCookie("ultimaVisita", fechaActual, 30);
}

mostrarUltimaVisita();

// LocalStorage para preferencias del jugador
let preferencias = JSON.parse(localStorage.getItem("preferenciasJugador")) || {
    idioma: "es",
    estadisticas: {
        partidasJugadas: 0,
        partidasGanadas: 0
    }
};

// Idioma
function cambiarIdioma() {
    const nuevoIdioma = (preferencias.idioma === "es") ? "en" : "es";
    if (nuevoIdioma !== preferencias.idioma) {
        preferencias.idioma = nuevoIdioma;
        localStorage.setItem("preferenciasJugador", JSON.stringify(preferencias));
        alert(nuevoIdioma === "es" ? "Idioma cambiado a español" : "Language changed to English");
        location.reload();
    }
}


// Aplicar idioma al cargar
if (preferencias.idioma === "en") {
    document.title = "Player Preferences";
} else {
    document.title = "Preferencias del Jugador";
}

// Restablecer preferencias
function restablecerPreferencias() {
    if (confirm("¿Seguro que deseas restablecer todas las preferencias?")) {
        localStorage.clear();
        deleteCookie("temaTablero");
        deleteCookie("ultimaPieza");
        deleteCookie("ultimaVisita");
        alert("Preferencias restablecidas. La página se recargará.");
        location.reload();
    }
}