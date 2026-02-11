const ul = document.getElementById("menu")

ul.addEventListener("click", (e) =>{
    const li = e.target;

    if(li.tagName === "LI"){
        const opcion = li.dataset.op;
        if(opcion === "perfil") {
            alert("Has clicado en perfil")
        }
        if(opcion === "config"){
            alert("Has clicado en configuracion")
        }
        if(opcion === "salir"){
            alert("Has clicado en salir")
        }
    }
})