import { Game } from './js/game.js';

const game = new Game();
window.game = game;

function startGame() {
    console.log("Game started", game);
}
window.onload = startGame;