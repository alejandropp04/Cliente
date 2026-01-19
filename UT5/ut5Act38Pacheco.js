// script.js

// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formTorneo");

    // Campos del formulario
    const jugadorBlancas = document.getElementById("jugadorBlancas");
    const jugadorNegras = document.getElementById("jugadorNegras");
    const colorRadios = document.getElementsByName("color");
    const resultado = document.getElementById("resultado");
    const email = document.getElementById("email");
    const fecha = document.getElementById("fecha");
    const comentario = document.getElementById("comentario");

    // Elementos para mensajes de error
    const errBlancas = document.getElementById("errBlancas");
    const errNegras = document.getElementById("errNegras");
    const errColor = document.getElementById("errColor");
    const errResultado = document.getElementById("errResultado");
    const errEmail = document.getElementById("errEmail");
    const errFecha = document.getElementById("errFecha");
    const errComentario = document.getElementById("errComentario");
    const mensajeFinal = document.getElementById("mensajeFinal");

    // Expresiones regulares
    const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    /**
     * Función para validar el formulario.
     * Retorna true si todos los campos son válidos, false si hay errores.
     */
    function validarFormulario() {
        let valido = true;

        // --- Validar jugador blancas ---
        if (!regexNombre.test(jugadorBlancas.value.trim())) {
            errBlancas.textContent = "Nombre inválido (mínimo 3 letras, solo letras y espacios).";
            valido = false;
        } else {
            errBlancas.textContent = "";
        }

        // --- Validar jugador negras ---
        if (!regexNombre.test(jugadorNegras.value.trim())) {
            errNegras.textContent = "Nombre inválido (mínimo 3 letras, solo letras y espacios).";
            valido = false;
        } else {
            errNegras.textContent = "";
        }

        //Validar que ambos nombres no sean iguales
        if (jugadorBlancas.value.trim() === jugadorNegras.value.trim()) {
            errNegras.textContent = "Los nombres de los jugadores no pueden ser iguales.";
            valido = false;
        }else {
            errNegras.textContent = "";
        }

        // --- Validar color elegido ---
        let colorSeleccionado = false;
        for (let radio of colorRadios) {
            if (radio.checked) {
                colorSeleccionado = true;
                break;
            }
        }
        if (!colorSeleccionado) {
            errColor.textContent = "Debes elegir un color.";
            valido = false;
        } else {
            errColor.textContent = "";
        }

        // --- Validar resultado ---
        if (resultado.value === "") {
            errResultado.textContent = "Debes seleccionar un resultado.";
            valido = false;
        } else {
            errResultado.textContent = "";
        }

        // --- Validar email ---
        if (!regexEmail.test(email.value.trim())) {
            errEmail.textContent = "Email inválido.";
            valido = false;
        } else {
            errEmail.textContent = "";
        }

        // --- Validar fecha ---
        const hoy = new Date().setHours(0,0,0,0);
        const fechaValor = new Date(fecha.value).setHours(0,0,0,0);
        if (!fecha.value) {
            errFecha.textContent = "Debes seleccionar una fecha.";
            valido = false;
        } else if (fechaValor > hoy) {
            errFecha.textContent = "La fecha no puede ser futura.";
            valido = false;
        } else {
            errFecha.textContent = "";
        }

        // --- Validar comentario ---
        if (comentario.value.length > 200) {
            errComentario.textContent = "Máximo 200 caracteres.";
            valido = false;
        } else {
            errComentario.textContent = "";
        }

        return valido;
    }

    /**
     * Función para guardar la partida en localStorage
     */
    function guardarPartida() {
        const partidas = JSON.parse(localStorage.getItem("partidas")) || [];

        // Obtener color seleccionado
        let colorElegido = "";
        for (let radio of colorRadios) {
            if (radio.checked) colorElegido = radio.value;
        }

        const partida = {
            jugadorBlancas: jugadorBlancas.value.trim(),
            jugadorNegras: jugadorNegras.value.trim(),
            color: colorElegido,
            resultado: resultado.value,
            email: email.value.trim(),
            fecha: fecha.value,
            comentario: comentario.value.trim()
        };

        partidas.push(partida);
        localStorage.setItem("partidas", JSON.stringify(partidas));
    }

    /**
     * Manejo del submit del formulario
     */
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar envío si hay errores

        if (validarFormulario()) {
            guardarPartida();
            form.reset();
            mensajeFinal.textContent = "Partida registrada correctamente ✅";
        } else {
            mensajeFinal.textContent = "";
        }
    });

    /**
     * Validación dinámica en input/change para mejor UX
     */
    jugadorBlancas.addEventListener("input", () => {
        if (regexNombre.test(jugadorBlancas.value.trim())) errBlancas.textContent = "";
    });

    jugadorNegras.addEventListener("input", () => {
        if (regexNombre.test(jugadorNegras.value.trim()) && jugadorNegras.value.trim() !== jugadorBlancas.value.trim()) {
            errNegras.textContent = "";
        }
    });

    email.addEventListener("input", () => {
        if (regexEmail.test(email.value.trim())) errEmail.textContent = "";
    });

    comentario.addEventListener("input", () => {
        if (comentario.value.length <= 200) errComentario.textContent = "";
    });

    fecha.addEventListener("change", () => {
        const hoy = new Date().setHours(0,0,0,0);
        const fechaValor = new Date(fecha.value).setHours(0,0,0,0);
        if (fechaValor <= hoy) errFecha.textContent = "";
    });

    for (let radio of colorRadios) {
        radio.addEventListener("change", () => {
            errColor.textContent = "";
        });
    }

    resultado.addEventListener("change", () => {
        if (resultado.value !== "") errResultado.textContent = "";
    });
});
