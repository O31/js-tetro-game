import { GRID_ROWS, GRID_COLS } from './variables.js';

export class Board {
    constructor() {
        this.grid = Array.from({ length: GRID_ROWS }, (_, r) =>
            Array.from({ length: GRID_COLS }, (_, c) => ({
                color: null, owner: null, pieceId: null, row: r, col: c
            }))
        );
        this.tetrominoes = [];
    }
    render(onCellClick) {
        const boardDiv = document.getElementById('game-board');
        boardDiv.innerHTML = '';
        for (let row of this.grid) {
            for (let cell of row) {
                let div = document.createElement('div');
                div.className = 'cell';
                div.style.backgroundColor = cell.color;

                if (cell.owner === 1) div.classList.add('player1');
                if (cell.owner === 2) div.classList.add('player2');

                div.dataset.row = cell.row;
                div.dataset.col = cell.col;

                div.addEventListener('click', () => {
                    console.log(`Clicked cell at (${cell.row}, ${cell.col})`);
                });
                boardDiv.appendChild(div);
            }
        }
    }
}