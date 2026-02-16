const root = ReactDOM.createRoot(document.getElementById("root"));
const e = React.createElement;

function App() {
    const [moves, setMoves] = React.useState([]);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

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

    return e("div", null,
        e("button", { onClick: loadMoves }, "Cargar aperturas"),
        loading && e("p", null, "Cargando datos..."),
        error && e("p", { style: { color: "red" } }, error),
        e("ul", null,
            moves.map((m, i) => e("li", { key: i }, m.san))
        )
    );
}
root.render(e(App))