//Guardar el turno en un estado, usa useEffect para mostrar un mensaje eutomatico "Turno de las blancas / Turno de las negras"
// Cambia el turno con un boton. UseEffect sin fetch, relacion estado -> interfaz y comprecion del ciclo de vida.
const root = ReactDOM.createRoot(document.getElementById('root'));
const e = React.createElement;
const { useState, useEffect } = React;

function App() {
  const [turno, setTurno] = useState('blancas');

  useEffect(() => {
    console.log(`Turno de las ${turno}`);
  }, [turno]);

  const cambiarTurno = () => {
    setTurno(prevTurno => (prevTurno === 'blancas' ? 'negras' : 'blancas'));
  };

  const mensaje = turno === 'blancas' ? 'Turno de las blancas' : 'Turno de las negras';

  return e('div', null,
    e('h1', null, mensaje),
    e('button', { onClick: cambiarTurno }, 'Cambiar Turno')
  )
}

root.render(e(App));