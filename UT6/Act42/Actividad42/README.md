# Actividad 41 - Ajedrez Modular

El proyecto se organiza en módulos dentro de la carpeta `js/`, separados por responsabilidad: tablero, piezas, movimientos y lógica principal.

## Estructura

- **board.js** → Generación del tablero, inyección de estilos y manipulación visual (resaltado).
- **pieces.js** → Gestión de las piezas (colocación inicial, movimiento en el DOM).
- **movements.js** → Lógica de validación de movimientos según el tipo de pieza.
- **main.js** → Punto de entrada, inicialización y gestión de eventos del usuario.

## Funcionalidad

1. Generación dinámica del tablero 8x8.
2. Alternancia de colores (claro/oscuro).
3. Colocación inicial de **fila completa de peones** en la fila 2.
4. Sistema de **selección de pieza** con resaltado visual.
5. Validación de movimiento extensible (actualmente implementado para Peón Blanco).

## Eventos utilizados

- `DOMContentLoaded` para iniciar la aplicación.
- `click` con delegación en el tablero para gestionar selección y movimiento.

## Modularización

Se separa la lógica de presentación (board), la lógica de entidades (pieces) y la lógica de reglas (movements) para mejorar la escalabilidad y mantenibilidad.
