function enablePawnMovement() {
    document.querySelectorAll(".square").forEach(square => {
        square.addEventListener("click", () => handleMove(square));
    });
}

function handleMove(target) {
    if (target.textContent !== "") return;

    const toRank = parseInt(target.dataset.rank);
    const file = target.dataset.file;

    // Peones blancos
    const whiteCandidates = Array.from(document.querySelectorAll(".square")).filter(sq => {
        return (
            sq.textContent === "♙" &&
            sq.dataset.moved !== "true" &&
            sq.dataset.file === file &&
            (toRank - parseInt(sq.dataset.rank) === 1 || toRank - parseInt(sq.dataset.rank) === 2)
        );
    });

    // Peones negros
    const blackCandidates = Array.from(document.querySelectorAll(".square")).filter(sq => {
        return (
            sq.textContent === "♟" &&
            sq.dataset.moved !== "true" &&
            sq.dataset.file === file &&
            (parseInt(sq.dataset.rank) - toRank === 1 || parseInt(sq.dataset.rank) - toRank === 2)
        );
    });

    // Elegimos el peón más cercano según el color
    let pawn = null;
    if (whiteCandidates.length > 0) {
        pawn = whiteCandidates.reduce((prev, curr) => {
            return parseInt(curr.dataset.rank) > parseInt(prev.dataset.rank) ? curr : prev;
        });
    } else if (blackCandidates.length > 0) {
        pawn = blackCandidates.reduce((prev, curr) => {
            return parseInt(curr.dataset.rank) < parseInt(prev.dataset.rank) ? curr : prev;
        });
    }

    if (!pawn) return;

    // Mover el peón
    target.textContent = pawn.textContent;
    target.dataset.moved = "true";
    target.style.display = "flex";
    target.style.alignItems = "center";
    target.style.justifyContent = "center";
    target.style.fontSize = "32px";

    pawn.textContent = "";
    pawn.dataset.moved = "true";
}
