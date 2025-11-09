const historialModule = (() =>{
    let historial = [];
    function registrarJugada(jugada){
        historial.push(jugada);
    }
    function mostrarHistorial(){
        console.log("Historial de jugadas:");
        historial.forEach((jugada, i)=> console.log(`${i + 1}. ${jugada}`));
    }

    return {registrarJugada, mostrarHistorial};
})();

export const {registrarJugada, mostrarHistorial} = historialModule;