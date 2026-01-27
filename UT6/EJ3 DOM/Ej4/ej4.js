function generarCasillas(){
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    const casillas = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let x=0; x<8; x++){
        const casilla = document.createElement('div');
        casilla.classList.add('square');

        const isDark = x % 2 === 0;
        casilla.classList.add(isDark ? 'dark' : 'light');

        const pos = `${casillas[x]}1`;
        casilla.setAttribute('data-pos', pos);

        board.appendChild(casilla);
    }
}
generarCasillas();

const gameState = {
    selected: null
}

const board = document.getElementById('board');

board.addEventListener('click', (event) => {
    const celda = event.target;
    if (!celda.classList.contains('square')) return;
    gameState.selected = celda.dataset.pos;
    console.log(gameState.selected);
    render();
})

function render(){
    const casillas = document.querySelectorAll('.square');
    casillas.forEach(casilla => {
        const pos = casilla.dataset.pos;
        casilla.classList.toggle(
            'highlight',
            pos === gameState.selected,
        );
    });
}
