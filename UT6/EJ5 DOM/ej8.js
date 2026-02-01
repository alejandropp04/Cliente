const root = ReactDOM.createRoot(
    document.getElementById("root"),
)

const e = React.createElement;

function Tablero(){
    const casillas = [];

    for(let fila = 0; fila < 2; fila++){
        for (let columna = 0; columna < 2; columna++){
            const tienePeon = fila === 0 && columna === 0;
            const esOscura = (fila + columna) % 2 === 0;

            casillas.push(
                e(
                    "div",
                    {
                        key: `${fila}-${columna}`,
                        className: `square ${esOscura ? "dark" : "light"}`,
                    },
                    tienePeon ? "♙" : null
                )
            );
        }
    }
    return e("div", {className: "board"}, casillas);
}

root.render(e(Tablero));