const root = ReactDOM.createRoot(document.getElementById("root"));
const e = React.createElement;

function esperar(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function App(){
    const [history, setHistory] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    async function somularMovimiento(){
        if (loading) return;

        setLoading(true);
        setError("");

        try {
            await esperar(1000) //Espera de 1 segundo para simular el movimiento

            const movmiento = "Peon e2 -> e4";

            //Añadir el movimiento al historial
            setHistory(prev => [...prev, movmiento]);
        } catch (error) {
            setError("Error al simular el movimiento");
        }finally {
            setLoading(false);
        }
    }

    return e("div", null,
        e("button",
            { onClick: somularMovimiento, disabled: loading },
            loading ? "Simulando..." : "Simular movimiento"
        ),

        error && e("p", { style: { color: "red" } }, error),

        history.length === 0
            ? e("p", null, "No hay movimientos simulados")
            : e("ol", null,
                history.map((m, i) =>
                    e("li", { key: i }, m)
                )
            )
    );
}

root.render(e(App))