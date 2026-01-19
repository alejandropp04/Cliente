export function createBoard(){
    const board = document.getElementById('board');
    board.innerHTML = '';
    board.className = 'board';

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

    for (let y = 7; y>=0; y--){
        for (let x=0; x<8; x++){
            const celda = document.createElement('div');
            celda.classList.add('square');

            //alternar colores blancos
            const isDark = (x+y) % 2 === 0;
            celda.classList.add(isDark ? 'dark' : 'light');

            //data-pos (ej: a1, h8)
            const pos = `${letters[x]}${y+1}`;
            celda.setAttribute('data-pos', pos);

            board.appendChild(celda);
        }
    }
}