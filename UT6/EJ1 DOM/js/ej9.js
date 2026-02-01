const form = document.getElementById("login")
const user = document.getElementById("user")
const password = document.getElementById("pass")
const msg = document.getElementById("msg")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const usuario = user.value.trim();
    const password = pass.value.trim();

    //Reset mensaje
    msg.textContent = "";
    msg.style.color = "red"

    //Verificamos al longitud del usuario, al menos 3 caracteres
    if(usuario.length < 3){
        msg.textContent = "El usuario debe tener al menos 3 caracteres"
        return;
    }

    // Verificamos la longitud de la contraseña, al menos 6 caracteres
    if(password.length < 6){
        msg.textContent = "La contrasña debe tener al menos 6 caracteres"
        return;
    }

    // Si esta Todo correcto
    msg.style.color = "green"
    msg.textContent = "Acceso permitido"
});