import { Board } from './board.js';
import { Player } from './player.js';

export class Game {
    constructor() {
        this.board = new Board();
        this.players = [new Player(1, "Player 1", '#18448c'), new Player(2, "Player 2", '#a81d8d')];
        this.currentPlayerIndex = 0;
    }
}