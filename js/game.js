import { Board } from './board.js';
import { Player } from './player.js';

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
        this.board.render();
        document.getElementById('player1-info').classList.toggle('player1-active', this.currentPlayerIndex === 0);
        document.getElementById('player2-info').classList.toggle('player2-active', this.currentPlayerIndex === 1);
        document.getElementById('turn-indicator').textContent = `${this.currentPlayer.name}'s turn`;
        document.getElementById('player1-score').textContent = this.players[0].score;
        document.getElementById('player2-score').textContent = this.players[1].score;
    }
    handleCellClick(x, y, cell) {
        console.log(`Cell clicked: x=${x}, y=${y}`);
        // Will implement territory claiming here soon
    }
    reset() {
        this.board = new Board();
        this.players.forEach(p => p.score = 0);
        this.currentPlayerIndex = 0;
    }
}