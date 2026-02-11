import Tareas from "./Tareas.js";

const e = React.createElement;

export function App() {
  return e('div', null, e(Tareas))
}

export default App;