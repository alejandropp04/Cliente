export const boardEl = document.getElementById('board');
const letters = ['a','b','c','d','e','f','g','h'];

export function createBoard() {
    boardEl.innerHTML = '';
    boardEl.className = 'board';
    for(let y=7; y>=0; y--){
        for(let x=0; x<8; x++){
            const cell = document.createElement('div');
            cell.classList.add('square');
            const isDark = (x+y)%2===0;
            cell.classList.add(isDark ? 'dark':'light');
            cell.dataset.pos = `${letters[x]}${y+1}`;
            boardEl.appendChild(cell);
        }
    }
}
