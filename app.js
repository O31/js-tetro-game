import { Game } from './js/game.js';

const game = new Game();
game.claimInitialTetrominoes();
game.render();

document.getElementById('new-game').onclick = () => {
    game.reset();
    game.claimInitialTetrominoes();
    game.render();
};