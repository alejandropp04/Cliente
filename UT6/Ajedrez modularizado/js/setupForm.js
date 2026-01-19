import { gameState } from './gameState.js';
import { initPieces, renderPieces } from './pieces.js';
import { updatePanel } from './panel.js';

export function setupForm() {
    const container = document.getElementById('setup');
    container.innerHTML = `
        <form id="setup-form">
            <label>Tiempo (min): <input type="number" name="time"></label>
            <label>Incremento (s): <input type="number" name="increment"></label>
            <label>Color inicial: 
                <select name="color">
                    <option value="white">Blanco</option>
                    <option value="black">Negro</option>
                </select>
            </label>
            <button type="submit">Crear partida</button>
            <p id="error-msg"></p>
        </form>
    `;

    const form = document.getElementById('setup-form');
    const errorEl = form.querySelector('#error-msg');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const time = parseInt(form.time.value);
        const increment = parseInt(form.increment.value);
        const color = form.color.value;

        if(time <= 0) { errorEl.textContent = 'El tiempo debe ser mayor que 0'; return; }
        if(increment < 0) { errorEl.textContent = 'Incremento debe ser ≥ 0'; return; }

        errorEl.textContent = 'Partida creada correctamente';
        gameState.turn = color;
        gameState.moveCount = 0;
        gameState.pieces = initPieces();
        gameState.history = [];
        updatePanel(' | Nueva partida');
        renderPieces(gameState);
    });
}
