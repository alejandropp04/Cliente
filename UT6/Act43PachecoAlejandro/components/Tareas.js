const e = React.createElement

function Tareas() {
  const tareas = [
    'Aprender React',
    'Practicar JavaScript',
    'Construir proyectos'
  ]

  return e(
    'ul',
    null,
    tareas.map((t, i) => e('li', { key: i }, t))
  )
}

export default Tareas