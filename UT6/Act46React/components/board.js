// Renderiza el tablero 8x8 y las coordenadas
// Cada casilla notifica su posición al hacer click

const e = React.createElement;

export function CrearTablero(props) {
    const piezas = props.piezas || {};
    const selected = props.selected || null;
    const moves = props.moves || [];
    const onSquareClick = props.onSquareClick || (() => {});

    const casillas = [];
    const letras = ["a","b","c","d","e","f","g","h"];

    for (let fila = 8; fila >= 1; fila--) {
        for (let x = 0; x < 8; x++) {
            const pos = `${letras[x]}${fila}`;
            const esOscura = (fila + x) % 2 === 0;

            const isSelected = pos === selected;
            const isMove = moves.includes(pos);

            casillas.push(
                e(
                    "div",
                    {
                        key: pos,
                        className:
                            `square ${esOscura ? "dark" : "light"}`
                            + (isSelected ? " selected" : "")
                            + (isMove ? " move" : ""),
                        "data-pos": pos,
                        onClick: () => onSquareClick(pos),
                    },
                    piezas[pos] || null
                )
            );
        }
    }

    // Coordenadas num
    const numeros = [];
    for (let i = 8; i >= 1; i--) {
        numeros.push(
            e("div", { key: i, className: "coord-num" }, i)
        );
    }
    // Coordenadas letras
    const letrasCoords = letras.map(l =>
        e("div", { key: l, className: "coord-let" }, l.toUpperCase())
    );

    return e(
        "div",
        { className: "board-wrapper" },
        e("div", { className: "coords-left" }, numeros),
        e("div", { className: "board" }, casillas),
        e("div", { className: "coords-bottom" }, letrasCoords)
    );
}

export default CrearTablero;
