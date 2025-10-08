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
}