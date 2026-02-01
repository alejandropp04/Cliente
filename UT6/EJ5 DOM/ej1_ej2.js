const root = ReactDOM.createRoot(
    document.getElementById('root')
);


const e = React.createElement;

//Componente para el H1
function Titulo(){
    return e(
        "h1",
        null,
        "Bienvenido al torneo de ajedrez"
    );
}

// Componente para crear los jugadores
function Jugador(props){
    return e(
        "p",
        null,
        "Jugador: " + props.nombre + "(ELO: " + props.elo + ")"
    )
}

// Componente App para actualizar el DOM y añadir los diferentes componentes con root
function App(){
    return e(
        "div",
        null,
        e(Titulo),
        e(Jugador, {nombre: "Alex", elo: 1850}),
        e(Jugador, {nombre: "Juan", elo: 2500}),
    )
}
root.render(e(App))

