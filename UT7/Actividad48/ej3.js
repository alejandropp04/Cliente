const root = ReactDOM.createRoot(document.getElementById("root"));
const e = React.createElement;

function App() {
    const [moves, setMoves] = React.useState([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [filter, setFilter] = React.useState(""); //Texto para filtrar movimientos

    async function loadMoves() {
        setError("");
        setLoading(true);

        try {
            const res = await fetch("https://explorer.lichess.ovh/masters");
            if (!res.ok) throw new Error();
            const data = await res.json();
            setMoves(data.moves.slice(0, 5));
        } catch {
            setError("Error al cargar los movimientos");
        } finally {
            setLoading(false);
        }
    }
    //Filtrar movimientos por el texto introducido
    const f = filter.trim().toLowerCase();

    const filtrados = moves.filter(m => {
        const san = m.san.toLowerCase();
        if (f === "") return true; //Si no hay filtro, mostrar todos
        return san.includes(f); //Mostrar solo los que contienen el filtro
    });

    return e("div", null,
        e("h2", null, "Aperturas filtrando por texto"),
        e("button", { onClick: loadMoves }, "Cargar aperturas"),
        e("div", null,
         e("input", {style: { marginTop: "10px" },
            type: "text",
            placeholder: "Filtrar movimientos",
            value: filter,
            onChange: e => setFilter(e.target.value)
         })
        ),

        loading && e("p", null, "Cargando datos..."),
        error && e("p", { style: { color: "red" } }, error),
        e("ul", null,
            filtrados.map((m, i) => e("li", { key: i }, m.san))
        )
    );
}
root.render(e(App))