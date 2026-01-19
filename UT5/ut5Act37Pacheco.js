document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formJugador');

    const nombre = document.getElementById('nombre');
    const correo = document.getElementById('correo');
    const elo = document.getElementById('elo');

    const errorNombre = document.getElementById('errorNombre');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorElo = document.getElementById('errorElo');
    const mensajeExito = document.getElementById('mensajeExito');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        //Limpiar mensajes previos
        errorNombre.textContent = "";
        errorCorreo.textContent = "";
        errorElo.textContent = "";

        let valido = true;

        // Validacion del nombre
        const patronNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,30}$/;
        if(!nombre.value.trim()) {
            errorNombre.textContent = "El nombre es obligatorio";
            valido = false;
        } else if(!patronNombre.test(nombre.value)) {
            errorNombre.textContent = "El nombre solo puede contener letras y espacios (2-30 caracteres)";
            valido = false;
        }

        // Validacion de correo
        const patronCorreo = /^[\w.-]+@[\w-]+\.[A-Za-z]{2,}$/;
        if(!correo.value.trim()) {
            errorCorreo.textContent = "El correo es obligatorio";
            valido = false;
        }else if(!patronCorreo.test(correo.value)) {
            errorCorreo.textContent = "Debe introducir un correo valido";
            valido = false;
        }

        // Validacion elo
        const valorElo = parseInt(elo.value);
        if(isNaN(valorElo)){
            errorElo.textContent = "Debe introducir un numero valido.";
            valido = false;
        } else if(valorElo < 800 || valorElo > 3000){
            errorElo.textContent = "El ELO debe estar entre 800 y 3000.";
            valido = false;
        }

        // Si todos los datos son correctos
        if(valido){
            mensajeExito.textContent = `Jugador ${nombre.value} se ha registrado correctamente.`;
            mensajeExito.style.color = "green";
            form.reset();
        }
    })
})