const gameState = {
    selected: null,
    clicks : {}
}

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
        casilla.dataset.pos = pos;

        board.appendChild(casilla);
    }
}

function render(){
    const casillas = document.querySelectorAll('.square');

    casillas.forEach(casilla => {
        const pos = casilla.dataset.pos;

        casilla.classList.toggle(
            'highlight',
            pos === gameState.selected,
        );

        casilla.textContent = gameState.clicks[pos] || 0;
    });
}

const board = document.getElementById('board');
board.addEventListener('click', (event) => {
    const celda = event.target.closest('.square');
    if (!celda.classList.contains('square')) return;

    const pos = celda.dataset.pos;
    gameState.selected = pos;
    gameState.clicks[pos] = (gameState.clicks[pos] || 0) +1;
    console.log(gameState.selected);
    render();
})

generarCasillas();
render();