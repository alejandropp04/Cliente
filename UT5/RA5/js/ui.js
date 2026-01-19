// ui.js
import { partidas } from './data.js';

export function actualizarResumen() {
    const ok = document.getElementById('ok');
    const resumenPartidas = document.getElementById('resumen-partidas');

    if (!resumenPartidas) {
        const p = document.createElement('p');
        p.id = 'resumen-partidas';
        document.body.appendChild(p);
    }

    const resumen = document.getElementById('resumen-partidas');
    if (partidas.length === 0) {
        resumen.textContent = 'Partidas registradas: 0';
    } else {
        const ultima = partidas[partidas.length - 1];
        resumen.textContent = `Partidas registradas: ${partidas.length}
Última partida: ${ultima.blancas} vs ${ultima.negras} — ${ultima.resultado} (${ultima.fecha})`;
    }
}
