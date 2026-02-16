const root = ReactDOM.createRoot(document.getElementById("root"));
const e = React.createElement;

function App(){
    const [query, setQuery] = React.useState("");
    const [moves, setMoves] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        const q = query.trim().toLowerCase();

        //Si la query esta vacia no se muestra nada
        if (q === ""){
            setMoves([]);
            setError("");
            setLoading(false);
            return;
        }

        let cancelled = false;

        async function load(){
            setLoading(true);
            setError("");

            try{
                const res = await fetch("https://explorer.lichess.ovh/masters");
                if (!res.ok) throw new Error();
                const data = await res.json();
                const filtered = data.moves.filter(m => m.san.toLowerCase().includes(q)).slice(0,5);
                if (!cancelled) setMoves(filtered);
            } catch (err) {
                if (!cancelled){
                    setMoves([]);
                    setError("Error cargando movimientos");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();

        return () => {
            cancelled = true;
        };
    }, [query]);

    return e("div", null,
        e("h2", null, "Mini buscador de movimientos"),

        e("input", {
            type: "text",
            value: query,
            placeholder: "Buscar movimientos",
            onInput: (event) => setQuery(event.target.value)
        }),

        loading && e("p", null, "Cargando..."),
        error && e("p", { style: { color: "red" } }, error),

        query.trim() !== "" && !loading && !error && (
            moves.length === 0
                ? e("p", null, "No se han encontrado movimientos")
                : e("ul", null, moves.map((m, i) => e("li", { key: i }, m.san)))
        )
    );
}

root.render(e(App));