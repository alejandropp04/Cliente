const tareas = document.getElementById('tareas');
const boton = document.getElementById('add');

boton.addEventListener('click', () => {
    const tarea = prompt("Introduzca una tarea");
    if (tarea && tarea.trim() !== ""){
        const li = document.createElement('li');
        li.textContent = tarea.trim();
        tareas.appendChild(li);
        li.addEventListener('click', () => {
            li.remove();
        })
    }else{
        alert("No se agrego la tarea, puede que este vacia")
    }
})