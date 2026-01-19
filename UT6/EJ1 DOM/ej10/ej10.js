const board = document.getElementById("board")

const files = ["a","b","c","d","e","f","g","h"]

for (let row = 8; row >= 1; row--) {
    for (let col = 0; col < 8; col++) {
        const square = document.createElement("div")
        square.classList.add("square")

        square.classList.add((row + col) % 2 === 0 ? "light" : "dark")

        square.dataset.pos = files[col] + row
        board.appendChild(square)
    }
}

const e2 = document.querySelector('[data-pos="e2"]')
const e3 = document.querySelector('[data-pos="e3"]')
const e4 = document.querySelector('[data-pos="e4"]')

e2.textContent = "♙"

let moved = false   //Movimiento no realizado

function movePawn(targetSquare){
    if(moved) return
    if(e2.textContent === "♙"){
        targetSquare.textContent = "♙"
        e2.textContent = ""
        moved = true
    }
}

e3.addEventListener('click', () => movePawn(e3))
e4.addEventListener("click", () => movePawn(e4))