import { gameState } from './gameState.js';
export const panelEl = document.getElementById('panel');

export function updatePanel(msg='') {
    panelEl.textContent = `Turno: ${gameState.turn} | Movimientos: ${gameState.moveCount} ${msg}`;
}
