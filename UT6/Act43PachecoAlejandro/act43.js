const root = ReactDOM.createRoot(document.getElementById('root'))

const e = React.createElement;

function Tareas(){
    const tareas = [
        "Aprender React",
        "Practicar JS",
        "Construir proyectos"
    ]

    return e(
        'ul',
        null,
        tareas.map((tarea, index) => e("li", {key: index}, tarea))
        )
}

root.render(e(Tareas))