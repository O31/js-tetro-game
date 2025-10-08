import { Board } from './board.js';
import { Player } from './player.js';
import { GRID_COLS } from './variables.js';

export class Game {
    constructor() {
        this.board = new Board();
        this.players = [new Player(1, "Player 1", '#18448c'), new Player(2, "Player 2", '#a81d8d')];
        this.currentPlayerIndex = 0;
    }

    get currentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    render() {
        this.board.render(this.handleCellClick.bind(this));
        document.getElementById('player1-info').classList.toggle('player1-active', this.currentPlayerIndex === 0);
        document.getElementById('player2-info').classList.toggle('player2-active', this.currentPlayerIndex === 1);
        document.getElementById('turn-indicator').textContent = `${this.currentPlayer.name}'s turn`;
        document.getElementById('player1-score').textContent = this.players[0].score;
        document.getElementById('player2-score').textContent = this.players[1].score;
    }

    claimInitialTetrominoes() {
        const tlCell = this.board.grid[0][0];
        const trCell = this.board.grid[0][GRID_COLS - 1];
        // Player 1: top-left
        if (tlCell.pieceId) {
            const t1 = this.board.tetrominoes.find(t => t.pieceId === tlCell.pieceId);
            for (let pos of t1.cells) {
                this.board.grid[pos.row][pos.col].owner = 1;
                this.players[0].score += 1;
            }
        }
        // Player 2: top-right
        if (trCell.pieceId) {
            const t2 = this.board.tetrominoes.find(t => t.pieceId === trCell.pieceId);
            for (let pos of t2.cells) {
                this.board.grid[pos.row][pos.col].owner = 2;
                this.players[1].score += 1;
            }
        }
    }

    handleCellClick(row, col, cell) {
        const { pieceId } = cell;
        if (!pieceId) return;

        const tetromino = this.board.tetrominoes.find(tet => tet.pieceId === pieceId);
        if (!tetromino) return;

        // Allow only if not already owned
        const alreadyOwned = tetromino.cells.some(pos =>
            this.board.grid[pos.row][pos.col].owner !== null
        );
        if (alreadyOwned) return;

        // Set ownership of ALL cells to current player
        for (let pos of tetromino.cells) {
            this.board.grid[pos.row][pos.col].owner = this.currentPlayer.id;
        }

        // Optionally store scoring...
        this.currentPlayer.score += tetromino.cells.length;

        this.switchPlayer();
        this.render();
    }

    switchPlayer() {
        this.currentPlayerIdx = (this.currentPlayerIdx + 1) % 2;
    }

    reset() {
        this.board = new Board();
        this.players.forEach(p => p.score = 0);
        this.currentPlayerIndex = 0;
    }
}