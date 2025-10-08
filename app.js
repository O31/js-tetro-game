import { Game } from './js/game.js';

const game = new Game();
game.render();  // Draw the starting state

document.getElementById('new-game').onclick = () => {
    game.reset();
    game.render();
};