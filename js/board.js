import { GRID_ROWS, GRID_COLS, COLORS, TETROMINO_SHAPES } from './variables.js';

export class Board {
    constructor() {
        this.grid = Array.from({ length: GRID_ROWS }, (_, r) =>
            Array.from({ length: GRID_COLS }, (_, c) => ({
                color: null, owner: null, pieceId: null, row: r, col: c
            }))
        );
        this.tetrominoes = [];
        this._fillBoard();

    }

    // Checks if shape can fit at (row, col)
    _canPlace(shape, row, col) {
        for (let r = 0; r < shape.length; r++) {
            for (let c = 0; c < shape[0].length; c++) {
                if (shape[r][c]) {
                    let br = row + r, bc = col + c;
                    if (
                        br >= GRID_ROWS || bc >= GRID_COLS ||
                        this.grid[br][bc].pieceId != null
                    ) return false;
                }
            }
        }
        return true;
    }

    // Place as many tetrominoes as possible
    _fillBoard() {
        let pieceId = 1;
        let attempts = 0;
        const shapeKeys = Object.keys(TETROMINO_SHAPES);
        while (attempts < 5000) {
            let shapeKey = shapeKeys[Math.floor(Math.random() * shapeKeys.length)];
            let color = COLORS[Math.floor(Math.random() * COLORS.length)];
            let shape = TETROMINO_SHAPES[shapeKey];
            let row = Math.floor(Math.random() * (GRID_ROWS - shape.length + 1));
            let col = Math.floor(Math.random() * (GRID_COLS - shape[0].length + 1));
            if (this._canPlace(shape, row, col)) {
                let cells = [];
                for (let r = 0; r < shape.length; r++) {
                    for (let c = 0; c < shape[0].length; c++) {
                        if (shape[r][c]) {
                            let br = row + r, bc = col + c;
                            this.grid[br][bc] = {
                                color, owner: null, pieceId, row: br, col: bc
                            };
                            cells.push({ row: br, col: bc });
                        }
                    }
                }
                this.tetrominoes.push({ pieceId, shapeKey, color, cells });
                pieceId++;
            }
            attempts++;
            // Stop if board is full
            if (this.grid.every(row => row.every(cell => cell.pieceId))) break;
        }

        for (let r = 0; r < GRID_ROWS; r++) {
            for (let c = 0; c < GRID_COLS; c++) {
                if (this.grid[r][c].color === null) {
                    if (r + 1 < GRID_ROWS && c + 1 < GRID_COLS) {
                        if (this.grid[r + 1][c + 1].color === null) {
                            console.log("Empty cell at", r, c);
                        }
                    }
                }
            }
        }


        render(onCellClick) {
            const boardDiv = document.getElementById('game-board');
            boardDiv.innerHTML = '';
            for (let row of this.grid) {
                for (let cell of row) {
                    let div = document.createElement('div');
                    div.className = 'cell';
                    div.style.backgroundColor = cell.color || '#f0f0f0';

                    if (cell.owner === 1) div.classList.add('player1');
                    if (cell.owner === 2) div.classList.add('player2');

                    div.dataset.row = cell.row;
                    div.dataset.col = cell.col;
                    div.dataset.pieceId = cell.pieceId;
                    div.textContent = cell.pieceId;

                    div.addEventListener('click', () => {
                        if (onCellClick) onCellClick(cell.row, cell.col, cell);
                    });
                    boardDiv.appendChild(div);
                }
            }
        }
    }