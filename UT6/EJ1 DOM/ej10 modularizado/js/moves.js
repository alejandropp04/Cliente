function enablePawnMove() {
    const e2 = document.querySelector('[data-pos="e2"]');
    const e4 = document.querySelector('[data-pos="e4"]');

    let moved = false; // estado del peón

    e4.addEventListener("click", () => {
        if (moved) return; // si ya se movió, no hacer nada

        if (e2.textContent === "♙") {
            e4.textContent = "♙";
            e2.textContent = "";
            moved = true;

            e4.dataset.moved = "true";
            e2.dataset.moved = "true";
        }
    });
}
